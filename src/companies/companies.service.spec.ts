import { CompaniesRepository } from './companies.repository';
// import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let companiesRepository:CompaniesRepository
  beforeEach(async () => {
    companiesRepository=new CompaniesRepository();
    service = new CompaniesService(companiesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
