// src/presentation/ws/middlewares/jwt.middleware.ts
import jwt from 'jsonwebtoken';
import type { Socket } from 'socket.io';

type JwtPayload = {
  id: string;
  iat: number;
  exp: number;
};

function extractToken(socket: Socket): string | null {
  const fromAuth = socket.handshake.auth?.token as string | undefined;

  const fromHeader = (socket.handshake.headers['authorization'] as string | undefined)
    ?.replace(/^Bearer\s+/i, '');

  const fromQuery = socket.handshake.query?.token as string | undefined;

  return fromAuth || fromHeader || fromQuery || null;
}

export const jwtAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = extractToken(socket);
    if (!token) return next(new Error('No token provided'));

    const secret = process.env.JWT_SECRET;
    if (!secret) return next(new Error('JWT_SECRET not configured'));

    const payload = jwt.verify(token, secret) as JwtPayload;

    // Guardamos el usuario en socket.data (contexto)
    socket.data.user = { uid: payload.id };

    return next();
  } catch (e: any) {
    console.log('[WS] Invalid token. error=', e?.message);
    return next(new Error('Invalid token'));
  }
};
