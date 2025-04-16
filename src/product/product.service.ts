import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getallproduct() {
        try{
            const getallproduct = await this.prisma.product.findMany({include:{category:true}});

            return(getallproduct);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createproduct(data,file:Express.Multer.File) {
        try{
            let fileName:string | undefined;

            if (file) {
                let imagePath: string | undefined;
                fileName = `${Date.now()}-${file.originalname}`;
                imagePath = join(__dirname, '..', '..', 'uploads', fileName);
                await writeFile(imagePath, file.buffer);
            }

            const createproduct = await this.prisma.product.create({
                data:{
                    categoryid:Number(data.categoryid),
                    barcode:data.barcode,
                    name:data.name,
                    price:Number(data.price),
                    stock:Number(data.stock),
                    description:data.description,
                    image:fileName
                }
            });

            return(createproduct);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
