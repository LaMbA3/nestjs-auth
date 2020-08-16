import { DietService } from './diet.service';
import { Controller, Get, Query, InternalServerErrorException } from '@nestjs/common';
import { queryParser } from 'src/utils/queryParser.decorator';

@Controller('diet')
export class DietController {
    constructor(
        private ds: DietService
    ){}

    @Get()
    async getAll(@Query() queries){
        const query = queryParser.build(queries);

        try{
            const dietPlans = this.ds.getAll(query);
            return dietPlans;
        }catch(err){
            throw new InternalServerErrorException(err);
        }
    }
}
