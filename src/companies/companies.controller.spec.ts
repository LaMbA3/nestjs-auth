import { CompaniesService } from './companies.service';
// import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './companies.repository';

describe('Companies Controller', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const companiesRepository:CompaniesRepository=new CompaniesRepository();
    const service:CompaniesService = new CompaniesService(companiesRepository)
    controller = new CompaniesController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });



});
