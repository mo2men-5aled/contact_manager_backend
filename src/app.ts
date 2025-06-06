import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';


import authRoutes from './routes/auth.route';
import contactRoutes from './routes/contact.route';

import { verifyToken } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts. Please try again later.'
});

const swaggerDocument = YAML.load(path.join(__dirname, 'docs/swagger.yaml'));

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth/login', loginLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', verifyToken, contactRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
