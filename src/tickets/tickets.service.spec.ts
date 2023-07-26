import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import objectHasFields from '../utils/object-has-fields';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return error if event id incorrect', async () => {
    return service
      .getAllEventTickets(1000001)
      .catch((e) => expect(e).toBeDefined());
  }, 120000);

  it('should return ticket data according to schema if event id correct', async () => {
    const ticketsData = await service.getAllEventTickets(1195);

    const isAllTicketPassSchema = ticketsData.every((ticketsData) =>
      objectHasFields(ticketsData, ['section', 'seat', 'price', 'row']),
    );

    expect(isAllTicketPassSchema).toBe(true);
  }, 120000);
});
