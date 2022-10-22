import express from 'express';
import dmmRouter from './dmm';
import seiyaRouter from './seiya';

const router = express.Router();

// v1以下のルーティング
router.use('/dmm', dmmRouter);
router.use('/seiya', seiyaRouter);

export default router;