import { Module } from '@nestjs/common';
import { TicketsResolver } from './tickets.resolver';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, TicketsResolver],
})
export class TicketsModule {}
