import { Order } from './order.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
