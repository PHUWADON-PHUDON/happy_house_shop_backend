import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getallcategory() {
        try{
            const getallcategory = await this.prisma.category.findMany();

            return(getallcategory);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createcategory(data:{name:string}) {
        try{
            const createcategory = await this.prisma.category.create({data:{name:data.name}});
            
            return(createcategory);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async updatecategory(id:string,data:{name:string}) {
        try{
            const updatecategory = await this.prisma.category.update({
                where:{id:Number(id)},
                data:{name:data.name}
            });

            return(updatecategory);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async delcategory(id:string) {
        try{
            const delcategory = await this.prisma.category.delete({where:{id:Number(id)}});

            return;
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async searchcategory(query:{search:string}) {
        try{
            const searchcategory = await this.prisma.category.findMany({
                where:{
                    name:{
                        contains:query.search.toLowerCase(),
                    }
                }
            });

            return(searchcategory);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
