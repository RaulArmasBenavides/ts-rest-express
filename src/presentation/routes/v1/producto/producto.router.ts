import { Router } from 'express';
import {   getProducts } from './producto.controller';
// import { validateContactUser, validateUser } from '../../../middlewares/admin.middleware';
// import UsuarioController from '../../../controllers/admin/usuario.controller';
// import { validateParamsGetNoSQL } from '../../../middlewares/interceptor.middleware';

const router = Router();
// const usuarioController = new UsuarioController()
router.route('/list')
     .get(getProducts)
    //  .post(createProduct)
    //  .post(validateUser, usuarioController.createUsuario)
    //  .put(validateUser, usuarioController.updateUsuario)

// router
//      .route('/contacto')
//      .put(validateContactUser, usuarioController.updateContactoUsuario)


export default router;