// import { User } from './../auth/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  //logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: dbConfig.synchronize,
};
