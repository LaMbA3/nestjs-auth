import { Company } from './company.entity';
import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException } from '@nestjs/common';


@EntityRepository(Company)
export class CompaniesRepository extends Repository<Company>{
 
    getAll(){
        return this.find();
    }

    createCompany(payload){
        const company = this.create();
        company.name = payload.name;

        try{
            company.save()
        }
        catch(err){
            throw new InternalServerErrorException(err);
        }
        return company;
    }

    
    async getById(id){
        return await this.findOneOrFail(id);
    }

    async deleteById(id){
        return await this.delete(id);
    }
}