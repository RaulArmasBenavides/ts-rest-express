import express, { Application, Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import db from '../infrastructure/data/db/connection';


class Server {

    private app: Application;
    private port: string;
    constructor() {
        this.app  = express();
        this.port = process.env.PORT ?? '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        // this.routes();
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            console.log(error);
            throw new Error(  );
        }

    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan('tiny'));  
        this.app.use(express.json({limit:'100MB'}));
        this.app.use(express.urlencoded({ extended: true, limit: '100MB' }));
        // Carpeta pública
        this.app.use( express.static('public') );
    }

    public setRoutes(  router: Router ) {
        this.app.use(router);
    
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;

