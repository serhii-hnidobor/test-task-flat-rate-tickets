import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import * as BlueBirdPromise from 'bluebird';
import { Ticket } from './models/ticket';
import convertSectionIdToName from '../utils/convert-section-id-to-name';
import * as process from 'process';

@Injectable()
export class TicketsService {
  async getAllEventTickets(eventId: number) {
    let browser: Browser | undefined;

    try {
      browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
        headless: 'new',
      });

      const page = await browser.newPage();

      await page.goto(`https://my.laphil.com/en/syos2/package/${eventId}`, {
        waitUntil: 'domcontentloaded',
      });

      await page.waitForSelector('#level-selector', { timeout: 45000 });

      await page.waitForSelector(
        '.syos-level-selector-price-types__item.bestavailable-order',
      );

      await page.click(
        '.syos-level-selector-price-types__item.bestavailable-order',
      );

      await page.waitForSelector(
        '.syos-level-selector-price-types__item.bestavailable-order button',
      );

      await page.click(
        '.syos-level-selector-price-types__item.bestavailable-order button',
      );

      return await this.getTicketsData(page);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await browser?.close();
    }
  }

  private async getTicketsData(page: Page) {
    await page.waitForSelector('.seat.seat--available');

    const availableTicketsIds = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.seat.seat--available')).map(
        (element) => `#${element.id}`,
      );
    });

    const ticketsData: Ticket[] = [];

    await BlueBirdPromise.each(availableTicketsIds, async (ticketId) => {
      try {
        const ticketData = await this.getTicketInfo(page, ticketId);

        ticketData && ticketsData.push(ticketData);
      } catch (error) {
        console.error(error);
      }
    });

    return ticketsData;
  }

  private async getTicketInfo(page: Page, id: string): Promise<Ticket | null> {
    const [_, seat, row, sectionId] = id
      .replace('#', '')
      .toLowerCase()
      .split('-');

    const priceArray = await page.evaluate((selector) => {
      const element = document.querySelector(selector);

      return element?.getAttribute('data-tip')?.match(/\$\d+(\.\d{2})?/g);
    }, id);

    if (!priceArray) {
      return null;
    }

    return {
      seat,
      row,
      section: convertSectionIdToName(Number(sectionId)),
      price: [...priceArray][0],
    };
  }
}
