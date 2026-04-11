import { Request, Response } from 'express';
import { EventService } from '../services/EventService.js';
import { ChoirEvent } from '../models/ChoirEvent.js';

export class EventController {
  private eventService = new EventService();

  public getAll = async (req: Request, res: Response) => {
    const events = await this.eventService.find();

    return res.render('pages/event_list', {
      success: true,
      events: events,
    });
  };

  public getById = async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id as string);
    const event = await this.eventService.find({ id: eventId });

    //console.log(event[0].dateString);

    return res.render('pages/event_form', {
      success: true,
      event: event[0],
    });
  };

  public create = async (req: Request, res: Response) => {
    try {
      const event = new ChoirEvent(req.body);
      const success = await this.eventService.save(event);

      if (success) {
        return res
          .status(201)
          .json({ message: 'Fellépés létrehozása sikeres.' });
      } else {
        return res.status(404).json({
          error: 'Hiba történt a fellépés létrehozása során.',
        });
      }
    } catch (error) {
      console.error('Hiba történt:', error);
      return res.status(500).json({ error: 'Szerver hiba' });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const event = new ChoirEvent(req.body);
      const success = await this.eventService.save(event);

      if (success) {
        return res
          .status(200)
          .json({ message: 'Fellépés szerkeztése sikeres.' });
      } else {
        return res.status(404).json({
          error: 'Hiba történt a fellépés szerkeztése során.',
        });
      }
    } catch (error) {
      console.error('Hiba történt:', error);
      return res.status(500).json({ error: 'Szerver hiba' });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const eventId = parseInt(req.params.id as string);
      const success = await this.eventService.delete(eventId);

      if (success) {
        return res.status(200).json({ message: 'Fellépés törlése sikeres.' });
      } else {
        return res.status(404).json({
          error: 'Hiba történt a fellépés törlése során.',
        });
      }
    } catch (error) {
      console.error('Hiba történt:', error);
      return res.status(500).json({ error: 'Szerver hiba' });
    }
  };
}
