import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';

describe('Orders Controller', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should have addOrder', () => {
    expect(controller.addOrder).toBeDefined();
  });
  it('should have getOrders', () => {
    expect(controller.getOrders).toBeDefined();
  });
  it('should have getOrder', () => {
    expect(controller.getOrderById).toBeDefined();
  });
});
