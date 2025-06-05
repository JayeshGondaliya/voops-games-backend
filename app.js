import express from 'express';
import session from 'express-session';
import { connectDB } from './config/db.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import gameRouter from './routes/gameRouter.js';
import categoryRouter from './routes/categoryRouter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware: Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// CORS setup
const corsOptions = {
  origin: 'https://voop-games-frontend.vercel.app',
  credentials: true,
};
app.use(cors(corsOptions));

// Cookie parser & session
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: false, // Set true if using HTTPS
    },
  })
);





  app.use('/api/game', gameRouter);
  app.use("/api/game/category",categoryRouter)





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
