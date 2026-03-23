import { IEventRepository } from '../interfaces/repositories/IEventRepository';

export class EventRepository implements IEventRepository {
  findAll(): IEvent[] {
    return [];
  }
}