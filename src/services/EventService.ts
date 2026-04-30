import { EventRepository } from '../repositories/EventRepository.js';
import { IEventFilter } from '../interfaces/filters/IEventFilter';
import { ChoirEvent } from '../models/ChoirEvent.js';

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  public async find(filter?: IEventFilter): Promise<ChoirEvent[] | null> {
    if (!filter) {
      return await this.eventRepository.findAll();
    }

    if (filter.id && filter.id > 0) {
      return await this.eventRepository.findById(filter.id);
    }

    if (filter.keyword && filter.keyword.trim() !== '') {
      return await this.eventRepository.findByKeyword(filter.keyword);
    }

    return [new ChoirEvent()];
  }

  public async save(event: ChoirEvent): Promise<boolean> {
    if (event.id > 0) {
      return await this.eventRepository.update(event);
    }
    return await this.eventRepository.create(event);
  }

  public async delete(eventId: number): Promise<boolean> {
    return await this.eventRepository.delete(eventId);
  }
}
