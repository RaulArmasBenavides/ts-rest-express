import { Router } from 'express';
import usuario from './user.router';
// import modulo from './modulo.router';
// import perfil from './perfil.router';

const router = Router();

router.use('/usuario', usuario)
// router.use('/modulo', modulo)
// router.use('/perfil', perfil)

export default router;