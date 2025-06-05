import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import contactRoutes from './routes/contact.route';

import { verifyToken } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, 'docs/swagger.yaml'));

console.log('Swagger Document Loaded:', swaggerDocument);
const app = express();

app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', verifyToken, contactRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
