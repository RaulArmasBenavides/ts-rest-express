import dotenv from 'dotenv';
import { Server } from './src/presentation/Server';
import { AppRoutes } from './src/presentation/routes/v1';
dotenv.config();
const server = new Server();
server.setRoutes( AppRoutes.routes );
server.listen();

//   server.start().then(() => {
//     console.log(`Servidor HTTP corriendo en el puerto ${serverOptions.port}`);

//     // Inicializa Socket.IO con la instancia del servidor HTTP
//     const myServer = SocketIOService.instance;
//     myServer.initSocketIO(httpServer.httpServer);
//   });