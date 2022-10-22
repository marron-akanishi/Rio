import express from 'express';
import dmmRouter from './dmm';

const router = express.Router();

// v1以下のルーティング
router.use('/dmm', dmmRouter);

export default router;