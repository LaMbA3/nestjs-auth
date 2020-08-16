import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';
import { ExercisesModule } from './routes/exercises/exercises.module';
import { OrdersModule } from './routes/orders/orders.module';
import { GroupsModule } from './routes/groups/groups.module';
import { WorkoutsModule } from './routes/workouts/workouts.module';
import { DietModule } from './routes/diet/diet.module';
import config from '../ormconfig';

console.log(config);
@Module({
  imports: [
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    AuthModule,
    ExercisesModule,
    OrdersModule,
    GroupsModule,
    WorkoutsModule,
    DietModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
