import express, { Router } from 'express';
import { EventRepository } from '../repositories/EventRepository.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { EventService } from '../services/EventService.js';
import { AuthService } from '../services/AuthService.js';
import { EventController } from '../controllers/EventController.js';
import { AuthController } from '../controllers/AuthController.js';
import { authenticateToken } from '../middlewares/AuthMiddleware.js';

const router: Router = express.Router();

const userRepository = new UserRepository();
const eventRepository = new EventRepository();

const authService = new AuthService(userRepository);
const eventService = new EventService(eventRepository);

const authController = new AuthController(authService);
const eventController = new EventController(eventService);

// REST API endpoints

// GET /api/events - Get all events
router.get('/events', authenticateToken, eventController.getAll);

// GET /api/events/:id - Get event by ID and
// if id = 0 create
// if id > 0 update
router.get('/events/:id', authenticateToken, eventController.getById);

// POST /api/events/ - Create an event
router.post('/events', authenticateToken, eventController.create);

// PUT /api/events/ - Update an event
router.put('/events/:id', authenticateToken, eventController.update);

// DELETE /api/events/:id - Delete an event
router.delete('/events/:id', authenticateToken, eventController.delete);

// Registration
router.post('/auth/register', authController.handleRegister);

// Login
router.post('/auth/login', authController.handleLogin);

export default router;
