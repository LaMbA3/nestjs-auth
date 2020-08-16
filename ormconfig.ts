import path = require("path");

require('dotenv').config();

console.log(process.env.TY);
export = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    cache:false,
    synchronize: process.env.ENV === 'development',
    // migrationsRun: process.env.ENV != 'development',
    logging: true,
    entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
    // entities: ["dist/entity/*.js"],
    migrations: [path.join(__dirname, "src/migration/*.entity{.ts,.js}")],
    cli: {
      migrationsDir: 'src/migration',
      entitiesDir: 'src/entities',
      subscribersDir: 'src/subscriber'
    },
  };


  // Use typeorm cli by $ npm run typeorm -- and after -- add whatever you want ....