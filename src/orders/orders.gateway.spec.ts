import { OrderService } from './orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersGateway } from './orders.gateway';

describe('OrdersGateway', () => {
  let gateway: OrdersGateway;

  beforeEach(async () => {
    
    const orderService: OrderService= new OrderService();
    gateway = new OrdersGateway(orderService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
