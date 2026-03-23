import express, { Router, Request, Response } from 'express';
import { PageDefinitions } from '../enums/PageDefinitions.js';
import { EventService } from '../services/EventService.js';
import { IEvent } from '../interfaces/models/IEvent';
import { Event } from '../models/Event.js';

const router: Router = express.Router();

const eventService = new EventService();

const save = async (req: Request, res: Response) => {
  try {
    const event: IEvent = new Event(req.body);
    const success = await eventService.save(event);

    if (success) {
      return res.redirect('/events');
    } else {
      return res.status(404).json({
        error: 'Hiba történt az esemény mentése során.',
      });
    }
  } catch (error) {
    console.error('Hiba történt:', error);
    return res.status(500).json({ error: 'Szerver hiba' });
  }
};

// REST API endpoints

// GET /api/events - Get all events
router.get('/events', async (req: Request, res: Response) => {
  const events = await eventService.find();

  return res.render('pages/events', {
    success: true,
    pageNum: PageDefinitions.Events,
    events: events,
  });
});

// GET /api/events/:id - Get event by ID and render form
// if id = 0 create
// if id > 0 update
router.get('/events/:id', async (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id as string);
  const event = await eventService.find({ id: eventId });

  return res.render('pages/event_form', {
    success: true,
    pageNum: PageDefinitions.Events,
    event: event,
  });
});

// POST /api/events/ - Create an event
// id = 0
router.post('/events', save);

// PUT /api/events/ - Update an event
// id > 0
router.put('/events/:id', save);

// DELETE /api/events/:id - Delete an event
router.delete('/events/:id', async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id as string);
    const success = await eventService.delete(eventId);

    if (success) {
      return res.redirect('/events');
    } else {
      return res.status(404).json({
        error: 'Hiba történt az esemény törlése során.',
      });
    }
  } catch (error) {
    console.error('Hiba történt:', error);
    return res.status(500).json({ error: 'Szerver hiba' });
  }
});

export default router;
