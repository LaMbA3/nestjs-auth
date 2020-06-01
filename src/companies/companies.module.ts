import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesRepository } from './companies.repository';

@Module({
  imports:[AuthModule,
    TypeOrmModule.forFeature([CompaniesRepository]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
