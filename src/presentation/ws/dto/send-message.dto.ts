// src/presentation/ws/dtos/send-message.dto.ts
export type SendMessageDTO = {
  roomId: string;
  text: string;
  clientMessageId?: string; // idempotencia/ack desde el cliente
};

export function validateSendMessageDTO(input: any): { ok: true; data: SendMessageDTO } | { ok: false; error: string } {
  const roomId = String(input?.roomId ?? '').trim();
  const text = String(input?.text ?? '').trim();
  const clientMessageId = input?.clientMessageId ? String(input.clientMessageId).trim() : undefined;

  if (!roomId) return { ok: false, error: 'roomId is required' };
  if (!text) return { ok: false, error: 'text is required' };
  if (text.length > 2000) return { ok: false, error: 'text is too long' };

  return { ok: true, data: { roomId, text, clientMessageId } };
}
