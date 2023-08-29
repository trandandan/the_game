import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway()
  export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('ballUpdate')
    handleBallUpdate(client: any, payload: any): void {
      // Broadcast the ball's position to all connected clients except the sender
      client.broadcast.emit('ballUpdated', payload);
    }
  
    // This method is called when a client connects
    handleConnection(client: any, ...args: any[]): void {
      console.log(`Client ${client.id} connected`);
    }
  
    // This method is called when a client disconnects
    handleDisconnect(client: any): void {
      console.log(`Client ${client.id} disconnected`);
    }
  }
  