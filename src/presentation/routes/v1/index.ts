import { Router } from 'express';
import admin from './admin';
import producto from './producto';
// import auth from './auth';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/v1', admin );
    router.use('/api/v1', producto );
    // router.use('/api/v1', auth);
    // router.use('/api/categories', CategoryRoutes.routes );
    return router;
  }


}