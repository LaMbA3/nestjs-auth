// import { User } from './../auth/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: dbConfig.synchronize,
    migrationsRun: dbConfig.synchronize,
    // logging: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['src/migration/**/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
  };
};
