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

// // GET /api/events/:id - Get event by ID (for editing)
// router.get('/events/:id', (req: Request, res: Response) => {
//   const eventId = parseInt(req.params.id as string);
//   // Mock event data
//
//   res.json({
//     success: true,
//     pageNum: PageDefinitions.EventsForm,
//     data: events,
//     message: 'Esemény megnyitása szerkesztésre sikeres.',
//   });
// });

// POST /api/events - Create a new event
router.post('/events', (req: Request, res: Response) => {
  const event:IEvent = new Event(req.body);
  eventService.saveEvent(event).then((success) => {
   res.redirect(`/events`);
  });
});

// PUT /api/events/:id - Update event
router.put('/events/:id', (req: Request, res: Response) => {
  const event: IEvent = new Event(req.body);
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


