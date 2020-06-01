import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from './companies.repository';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompaniesRepository)
        private companiesRepository:CompaniesRepository
    ){}

    getAll(){
        return this.companiesRepository.getAll();
    }

    createCompany(payload){
        return this.companiesRepository.createCompany(payload);
    }

    getCompanyById(id){
        return this.companiesRepository.getById(id);
    }

    updateById(id){
        return id;
    }

    deleteById(id){
        return this.companiesRepository.deleteById(id);
    }
    deleteAllCompanies(){
        return "riski operation"
    }
}
