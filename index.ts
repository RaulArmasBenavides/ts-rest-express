import dotenv from 'dotenv';
import { GenerateReport } from './controllers/usuarios';
import { DataReporteGeneral } from './entity/DataReporteGeneral';
import Server from './models/server';

// Configurar dot.env
dotenv.config();
console.log("vamos");
const server = new Server();
server.listen();

