import dotenv from 'dotenv';
import Server from './src/presentation/Server';
import { AppRoutes } from './src/presentation/routes/v1';
dotenv.config();
const server = new Server();
server.setRoutes( AppRoutes.routes );
server.listen();

