// src/presentation/ws/handlers/connection.handler.ts
 
import { Server, Socket } from 'socket.io';
import { registerSocketRoutes } from '../socket.routes';

export const onConnection = (client: Socket, io: Server) => {
  const uid = client.data?.user?.uid;

  console.log('[WS] client connected', { socketId: client.id, uid });

  if (uid) client.join(`user:${uid}`);

  // 👇 un solo punto para registrar eventos
  registerSocketRoutes(io, client);

  client.on('disconnect', (reason) => {
    console.log('[WS] client disconnected', { socketId: client.id, uid, reason });
  });
};
