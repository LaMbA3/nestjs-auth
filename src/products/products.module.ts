import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ProductsController],
})
export class ProductsModule {}
