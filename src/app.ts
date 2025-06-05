import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import contactRoutes from './routes/contact.route';

import { verifyToken } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', verifyToken, contactRoutes);

app.use(errorHandler);

export default app;
