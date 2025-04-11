import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getallcategory() {
        try{
            const getallcategory = this.prisma.category.findMany();

            return(getallcategory);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createcategory(data:{name:string}) {
        try{
            const createcategory = this.prisma.category.create({data:{name:data.name}});
            
            return(createcategory);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
