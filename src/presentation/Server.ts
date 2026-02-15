import express, { Application, Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import db from '../infrastructure/data/db/connection';
import { swaggerDocs as V1SwaggerDocs } from '../swagger';
import SocketIOService from './ws/SocketIOService';
import { errorMiddleware } from './middleware/error.middleware';

export class Server {
  private readonly app: Application;
  private readonly port: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? '8000';

    // Métodos iniciales
    this.dbConnection();
    this.middlewares();
 
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('tiny'));
    this.app.use(express.json({ limit: '100MB' }));
    this.app.use(express.urlencoded({ extended: true, limit: '100MB' }));
    // Carpeta pública
    this.app.use(express.static('public'));
    this.app.use(errorMiddleware);
  }

  public setRoutes(router: Router) {
    this.app.use(router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ' + this.port);
      V1SwaggerDocs(this.app, this.port);
    });

    const myServer = SocketIOService.instance;
    //   myServer.initSocketIO(this.app.httpServer);
  }
}
