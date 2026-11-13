import { Router } from 'express';
import { checkDatabaseConnection } from '../config/database.js';

const router = Router();

router.get('/health', async (req, res) => {
  try {
    await checkDatabaseConnection();

    res.status(200).json({
      status: 'healthy',
      database: 'connected',
    });
  } catch (error) {
    console.error('Healthcheck: error de conexión con PostgreSQL');

    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
    });
  }
});

export default router;
