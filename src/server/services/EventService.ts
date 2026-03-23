import { IEvent } from '../interfaces/models/IEvent';
import { EventRepository } from '../repositories/EventRepository';
import { IEventFilter } from '../interfaces/filters/IEventFilter';

export class EventService {
  private eventRepository = new EventRepository();

  public async find(filter?: IEventFilter): Promise<IEvent | IEvent[] | null> {
    if (!filter) {
      return await this.eventRepository.findAll();
    }

    if (filter.id && filter.id > 0) {
      return await this.eventRepository.findById(filter.id);
    }

    if (filter.keyword && filter.keyword.trim() !== '') {
      return await this.eventRepository.findByKeyword(filter.keyword);
    }

    return null;
  }

  public async save(event: IEvent): Promise<boolean> {
    if (event.id > 0) {
      return await this.eventRepository.update(event);
    }
    return await this.eventRepository.create(event);
  }

  public async delete(eventId: number): Promise<boolean> {
    return await this.eventRepository.delete(eventId);
  }
}
