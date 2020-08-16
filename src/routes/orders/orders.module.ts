import { OrderRepository } from './order.repository';
import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersGateway } from './orders.gateway';

@Module({
  imports: [OrderRepository],
  providers: [OrderService, OrdersGateway],
  controllers: [OrdersController],
})
export class OrdersModule {}
