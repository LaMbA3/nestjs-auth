import { Controller, Get, Post, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post('')
  addProducts() {}

  @Delete()
  deleteProducts() {}

  @Get('test')
  test() {
    return 'working';
  }
}
