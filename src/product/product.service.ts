import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async createproduct(data,file:Express.Multer.File) {
        try{
            let fileName:string | undefined;

            if (file) {
                let imagePath: string | undefined;
                fileName = `${Date.now()}-${file.originalname}`;
                imagePath = join(__dirname, '..', '..', 'uploads', fileName);
                await writeFile(imagePath, file.buffer);
            }

            console.log(data);

            return(
                await this.prisma.product.create({
                    data:{
                        categoryid:Number(data.categoryid),
                        barcode:data.barcode,
                        name:data.name,
                        price:data.price,
                        stock:data.stock,
                        description:data.description,
                        image:fileName
                    }
                })
            );
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}
