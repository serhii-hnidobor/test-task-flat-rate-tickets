import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  @Inject(TicketsService)
  private readonly ticketService: TicketsService;

  @Get(':eventId')
  async GetTickets(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.ticketService.getAllEventTickets(eventId).catch(() => {
      throw new NotFoundException();
    });
  }
}
