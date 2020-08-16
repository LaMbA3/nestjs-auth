import { GetRestoran } from '../../decorators/get-restoranid.decorator';
import { Controller, Post, Get, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Post('')
  addOrder() {
    return 'Order added';
  }
  @Get()
  getOrders() {
    //u query ima restoran id
  }
  @Get(':id')
  getOrderById(@Param('id') id, @GetRestoran() restoranId) {
    return `Id je: ${id}, restoranId: ${restoranId}`;
  }
}
