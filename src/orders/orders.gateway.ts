import { OrderService } from './orders.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  // WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class OrdersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private orderService: OrderService) {}

  @WebSocketServer()
  server;

  afterInit(server: any) {
    console.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(client, args);
  }
  handleDisconnect(client: any) {
    console.log('00000');
  }
  //  TODO: svaki restoran treba da predstavlja 1 room... probati rijesiti slanje narudzbe na ostale tablete
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    client.emit('hellooo');
    console.log(payload);
    // return { event: 'msgToClient', data: 'heloooo' };
  }
}
