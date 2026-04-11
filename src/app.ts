import express, { Application, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import apiRoutes from './routes/api.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. Load environment variables (.env file)
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// 2. Set up View Engine (EJS)
// Note: Ensure paths are correct for your deployment environment.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 3. Middlewares
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (form submissions)

// 4. API Routes
app.use('/api', apiRoutes);

// 5. Static Files
// This serves your compiled bundle.js and style.css from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// 6. Basic Route Example (The "C" in MVC would eventually go in /routes)
app.get('/', (req: Request, res: Response) => {
  res.render('index', {
    title: 'Kórus weboldal',
    message: 'Hello from TypeScript!',
  });
});

// 7. Start the Server
app.listen(PORT, () => {
  console.log(`
🚀 Server is screaming at: http://localhost:${PORT}
📂 Environment: ${process.env.NODE_ENV || 'development'}
    `);
});
