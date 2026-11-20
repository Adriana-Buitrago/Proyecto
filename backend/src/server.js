
import 'dotenv/config';
import express from 'express';
import { config } from './config/env.js';
import healthRouter from './routes/health.js';
import catalogRouter from './routes/catalog.js';
import cloudRouter from './routes/cloud.js';

const app = express();

// Configuración CORS para desarrollo local
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API DJ Sonido y Luces',
    status: 'running',
  });
});

app.use('/api', healthRouter);
app.use('/api', catalogRouter);
app.use('/api', cloudRouter);

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Servidor iniciado en el puerto ${config.port}`);
});
