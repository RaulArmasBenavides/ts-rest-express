// src/presentation/ws/handlers/messages.handler.ts
import type { Server, Socket } from 'socket.io';
import { validateSendMessageDTO } from '../dto/send-message.dto';
 
export const registerMessageHandlers = (client: Socket, io: Server) => {
  client.on('message:send', async (payload: any, ack?: (resp: any) => void) => {
    try {
      const validation = validateSendMessageDTO(payload);
      if (!validation.ok) return ack?.({ ok: false, error: validation.error });

      const { roomId, text, clientMessageId } = validation.data;
      const uid = client.data?.user?.uid;

      // Aquí eventualmente: persistencia (application service)
      // const saved = await messageService.save({ roomId, text, uid, clientMessageId })

      const message = {
        id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        roomId,
        text,
        from: uid,
        createdAt: new Date().toISOString(),
        clientMessageId,
      };

      // Emitir a todos los que están en la sala (incluye al emisor)
      io.to(`room:${roomId}`).emit('message:new', message);

      return ack?.({ ok: true, message });
    } catch (e: any) {
      return ack?.({ ok: false, error: e?.message ?? 'unknown error' });
    }
  });

  client.on('message:typing', (payload: { roomId: string; isTyping: boolean }) => {
    const roomId = String(payload?.roomId ?? '').trim();
    if (!roomId) return;

    const uid = client.data?.user?.uid;

    // Emitir a la sala EXCEPTO al emisor
    client.to(`room:${roomId}`).emit('message:typing', { uid, isTyping: !!payload?.isTyping });
  });
};
