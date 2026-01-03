// src/presentation/ws/handlers/rooms.handler.ts
import type { Server, Socket } from 'socket.io';

export const registerRoomHandlers = (client: Socket, _io: Server) => {
  client.on('room:join', async (payload: { roomId: string }, ack?: (resp: any) => void) => {
    try {
      const roomId = payload?.roomId?.trim();
      if (!roomId) return ack?.({ ok: false, error: 'roomId is required' });

      client.join(`room:${roomId}`);
      return ack?.({ ok: true });
    } catch (e: any) {
      return ack?.({ ok: false, error: e?.message ?? 'unknown error' });
    }
  });

  client.on('room:leave', async (payload: { roomId: string }, ack?: (resp: any) => void) => {
    try {
      const roomId = payload?.roomId?.trim();
      if (!roomId) return ack?.({ ok: false, error: 'roomId is required' });

      client.leave(`room:${roomId}`);
      return ack?.({ ok: true });
    } catch (e: any) {
      return ack?.({ ok: false, error: e?.message ?? 'unknown error' });
    }
  });
};
