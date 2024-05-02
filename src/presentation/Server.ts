import express, { Application, Router } from 'express';
// import userRoutes from '../routes/usuario';
import cors from 'cors';

import db from '../infrastructure/data/db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

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

        // CORS
        this.app.use( cors() );

        // Lectura del body
        // this.app.use( express.json() );
        // this.app.use(morgan('tiny')); //parece que se necesita implementar algo más TO-DO
        this.app.use(express.json({limit:'100MB'}));
        this.app.use(express.urlencoded({ extended: true, limit: '100MB' }));
        // Carpeta pública
        this.app.use( express.static('public') );
    }

    public setRoutes(  router: Router ) {
        this.app.use(router);
      }
    // routes() {
    //     this.app.use( this.apiPaths.usuarios, userRoutes )
    // }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;

