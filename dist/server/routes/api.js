import express from 'express';
import { PageDefinitions } from '../enums/PageDefinitions.js';
import { EventService } from '../services/EventService.js';
const router = express.Router();
const eventService = new EventService();
// Example REST API endpoints
// GET /api/events - Get all events
router.get('/events', (req, res) => {
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
router.post('/events', (req, res) => {
    const { title, description, links } = req.body;
    // In a real app, validate and save to database
    const event = { id: Date.now(), title, description, links };
    res.status(201).json({
        success: true,
        data: event,
        message: 'Esemény létrehozása sikeres.',
    });
});
// PUT /api/events/:id - Update event
router.put('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const { title, description, links } = req.body;
    // Mock update
    const updatedEvent = { id: eventId, title, description, links };
    res.json({
        success: true,
        data: updatedEvent,
        message: 'Esemény módosítása sikeres.',
    });
});
// DELETE /api/events/:id - Delete events
router.delete('/events/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    res.json({
        success: true,
        message: 'Esemény törlése sikeres.',
    });
});
export default router;
