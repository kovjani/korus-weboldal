import express, { Router } from 'express';
import { EventController } from '../controllers/EventController.js';

const router: Router = express.Router();

const eventController = new EventController();

// REST API endpoints

// GET /api/events - Get all events
router.get('/events', eventController.getAll);

// GET /api/events/:id - Get event by ID and render form
// if id = 0 create
// if id > 0 update
router.get('/events/:id', eventController.getById);

// POST /api/events/ - Create an event
router.post('/events', eventController.create);

// PUT /api/events/ - Update an event
router.put('/events/:id', eventController.update);

// DELETE /api/events/:id - Delete an event
router.delete('/events/:id', eventController.delete);

export default router;
