// src/presentation/services/SocketIOService.ts
import { Server as SocketIOServer } from 'socket.io';
import http from 'node:http';
import jwt from 'jsonwebtoken';
 
type JwtPayload = {
  uid: string;
  name: string;
  email?: string;
  iat: number;
  exp: number;
};

export default class SocketIOService {
  private static _intance: SocketIOService;
  public io!: SocketIOServer;
  private constructor() {}

  public initSocketIO(httpServer: http.Server) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.CORS_ORIGINS?.split(',') ?? [
          'http://localhost:4200',
        ],
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    this.io.engine.on('connection_error', (err: any) => {
      console.log('[EIO] connection_error:', {
        code: err.code,
        message: err.message,
        context: err.context,
      });
    });

    // 🔐 Middleware de autenticación por JWT (handshake)
    this.io.use((socket, next) => {
      try {
        const token =
          (socket.handshake.auth?.token as string | undefined) ||
          (
            socket.handshake.headers['authorization'] as string | undefined
          )?.replace(/^Bearer\s+/i, '') ||
          (socket.handshake.query?.token as string | undefined);

        if (!token) return next(new Error('No token provided'));

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: string;
          iat: number;
          exp: number;
        };

        socket.data.user = { uid: payload.id };

        return next();
      } catch (e: any) {
        console.log('[WS] Invalid token. error=', e?.message);
        return next(new Error('Invalid token'));
      }
    });

    this.escucharSockets();
  }

  public static get instance() {
    return this._intance || (this._intance = new this());
  }

  private escucharSockets() {
    console.log('Escuchando conexiones - sockets');
    this.io.on('connection', (cliente) => {
      // 👇 usa un único handler de “connection” que ya registra, emite y configura eventos
    //   socketHandlers.onConnection(cliente, this.io);
    });
  }
}
