import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: '/absensi',
  cors: { origin: '*' },
})
export class AbsensiGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AbsensiGateway.name);

  afterInit() {
    this.logger.log('AbsensiGateway initialized (namespace: /absensi)');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Client bergabung ke room sesi tertentu
  @SubscribeMessage('join-sesi')
  handleJoinSesi(
    @MessageBody() data: { sesiId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `sesi-${data.sesiId}`;
    client.join(room);
    this.logger.log(`${client.id} joined room: ${room}`);
    return { event: 'joined', data: { room } };
  }

  // Broadcast ke semua client di room sesi ketika ada mahasiswa hadir
  emitMahasiswaHadir(sesiId: number, payload: {
    nim: string;
    namaLengkap: string;
    waktuPresensi: Date;
    statusKehadiran: string;
  }) {
    this.server.to(`sesi-${sesiId}`).emit('mahasiswa-hadir', payload);
  }
}
