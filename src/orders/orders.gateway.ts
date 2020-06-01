import { OrderService } from './orders.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  // WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({namespace:'test',
// transports:['websocket']
})
export class OrdersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private orderService: OrderService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log("SOmeone connected")
    // io.sockets.on('connection', function(socket) {
    //   socket.on('join', function(room) {
    //   socket.join(room);
    //   });
  // });
    // console.log(client, args);
  }
  handleDisconnect(client: Socket) {
    // console.log('00000');
  }
  //  TODO: svaki restoran treba da predstavlja 1 room... probati rijesiti slanje narudzbe na ostale tablete
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    // client.send('hellooo');
    // client.join('aroom')
    this.server.to('soba').emit("msgToClient",'poruka neka')
    //   .emit('msgToClient', 'caoooo2');
    client.emit('hellooo');
    console.log(payload);
    // return { event: 'msgToClient', data: 'heloooo' };
  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client:Socket, room:string) {
    client.join(room)
    return { event: 'joinedRoom', data:{room}};
  }
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client:Socket, room:string) {
    client.leave(room)
    return { event: 'leavedRoom', data:{room}};
  }
}
