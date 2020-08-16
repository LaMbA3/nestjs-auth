import { Injectable } from '@nestjs/common';

@Injectable()
export class DietService {

    getAll(query){
        return query;
    }
}
