import { Router } from 'express';
import admin from './admin';
// import auth from './auth';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/v1', admin );
    // router.use('/api/v1', auth);
    // router.use('/api/categories', CategoryRoutes.routes );
    return router;
  }


}