import { IEvent } from '../interfaces/models/IEvent';
import { EventRepository } from '../repositories/EventRepository';

export class EventService {
  private eventRepository = new EventRepository();

  public async findAll(): Promise<IEvent[]> {
    return this.eventRepository.findAll();
  }

  public async findById(id: number): Promise<IEvent> {
    return this.eventRepository.findById(id);
  }

  public async saveEvent(event: IEvent): Promise<boolean> {
    if (event.id > 0) {
      return await this.eventRepository.update(event);
    }
    return await this.eventRepository.create(event);
  }
}