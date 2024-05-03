import { Router } from 'express';
import producto from './producto.router';
const router = Router();

router.use('/producto', producto)
export default router;