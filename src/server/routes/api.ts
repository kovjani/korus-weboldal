import express, { Router, Request, Response } from 'express';
import { PageDefinitions } from '../enums/PageDefinitions.js';
import { EventService } from '../services/EventService.js';
import { IEvent } from '../interfaces/models/IEvent';
import { Event } from '../models/Event.js';

const router: Router = express.Router();

const eventService = new EventService();

// REST API endpoints

// GET /api/events - Get all events
router.get('/events', (req: Request, res: Response) => {
  eventService.findAll().then((events) => {
    res.render('events', {
      success: true,
      pageNum: PageDefinitions.Events,
      events: events,
      title: 'Események',
      message: 'Események lekérése sikeres.',
    });
  });
});

// GET /api/events/:id - Get event by ID and render form
// if id = 0 create
// if id > 0 update
router.get('/events/:id', (req: Request, res: Response) => {
  const eventId = parseInt(req.params.id as string);
  eventService.findById(eventId).then((event) => {
    res.render('events_form', {
      success: true,
      pageNum: PageDefinitions.Events,
      events: event,
      title: 'Események',
      message: 'Események lekérése sikeres.',
    });
  });
});

// POST /api/events/ - Create or update event
// if id = 0 create
// if id > 0 update
router.post('/events', (req: Request, res: Response) => {
  const event:IEvent = new Event(req.body);
  eventService.saveEvent(event).then((success) => {
   res.redirect(`/events`);
  });
});

// DELETE /api/events/:id - Delete events
router.delete('/events/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id as string);
  res.json({
    success: true,
    message: 'Esemény törlése sikeres.',
  });
});

export default router;


