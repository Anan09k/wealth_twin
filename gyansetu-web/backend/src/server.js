import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { programs, testimonials } from './data.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());
app.use(morgan('dev'));

const leads = [];

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'gyansetu-backend' }));
app.get('/api/programs', (_req, res) => res.json(programs));
app.get('/api/testimonials', (_req, res) => res.json(testimonials));

app.post('/api/leads', (req, res) => {
  const { name, email, interest } = req.body;
  if (!name || !email || !interest) return res.status(400).json({ error: 'name, email, and interest are required' });
  const lead = { id: leads.length + 1, name, email, interest, createdAt: new Date().toISOString() };
  leads.push(lead);
  res.status(201).json({ message: 'Lead captured', lead });
});

app.get('/api/leads', (_req, res) => res.json(leads));

app.listen(port, () => console.log(`API running on ${port}`));
