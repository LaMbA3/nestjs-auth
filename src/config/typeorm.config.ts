// import { User } from './../auth/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
// const config = process.env;
// export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
//   return {
//     type: config.DB_TYPE,
//     host: config.DB_HOST,
//     port: Number(config.DB_PORT),
//     username: config.DB_USERNAME,
//     password: config.DB_PASSWORD,
//     database: config.DB_DATABASE_NAME,
//     synchronize: config.ENV === 'development',
//     migrationsRun: config.ENV === 'development',
//     // logging: true,
//     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//     migrations: ['src/migration/**/*.ts'],
//     cli: {
//       migrationsDir: 'src/migration',
//     },
//   };
// };


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
