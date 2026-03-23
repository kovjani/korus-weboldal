import { IEvent } from '../interfaces/models/IEvent';
import { EventRepository } from '../repositories/EventRepository';

export class EventService {
  private eventRepository = new EventRepository();

  public async findAll(): Promise<IEvent[]> {
    return this.eventRepository.findAll();
  }

  async saveEvent(event: IEvent): Promise<boolean> {
    if (event.id > 0) {
      return await this.eventRepository.update(event);
    } else {
      return await this.eventRepository.create(event);
    }
  }
}