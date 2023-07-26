import { Inject, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { Ticket } from './models/ticket';

@Resolver(() => Ticket)
export class TicketsResolver {
  @Inject(TicketsService)
  private readonly ticketService: TicketsService;

  @Query(() => [Ticket])
  async getEventTicket(@Args('eventId', ParseIntPipe) eventId: number) {
    try {
      return await this.ticketService.getAllEventTickets(eventId);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
