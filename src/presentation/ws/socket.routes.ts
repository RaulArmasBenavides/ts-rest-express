import { Server, Socket } from "socket.io";
 
import { registerMessageHandlers } from "./handlers/messages.handler";
import { registerRoomHandlers } from "./handlers/rooms.handler";

export const registerSocketRoutes = (io: Server, client: Socket) => {
  // Aquí enchufas todos tus módulos/eventos
  registerRoomHandlers(client, io);
  registerMessageHandlers(client, io);

  // Si luego agregas presence, notifications, etc:
  // registerPresenceHandlers(client, io);
};