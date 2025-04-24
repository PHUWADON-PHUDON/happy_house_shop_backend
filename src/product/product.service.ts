import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { unlink } from 'fs/promises';

interface ProductInfoType {
    id:number;
    name:string;
    price:number;
    stock:number;
    quantity:number;
    total:number
}

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getallproduct() {
        try{
            const getallproduct = await this.prisma.product.findMany({include:{category:true},orderBy:{id:"desc"}});
            
            return(getallproduct);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getproduct(id:{id:string}) {
        try{
            const getproduct = await this.prisma.product.findUnique({where:{id:Number(id.id)}});

            return(getproduct);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async createproduct(data,file:Express.Multer.File) {
        try{
            let fileName:string | undefined;

            if (file) {
                fileName = `${Date.now()}-${file.originalname}`;
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

            if (file) {
                let imagePath: string | undefined;
                imagePath = join(__dirname, '..', '..', 'uploads', fileName + "");
                await writeFile(imagePath, file.buffer);
            }

            return(createproduct);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async updateproduct(id:{id:string},data,file:Express.Multer.File) {
        try{
            let fileName:string | undefined;

            if (file) {
                fileName = `${Date.now()}-${file.originalname}`;
            }

            const getproduct = await this.prisma.product.findUnique({where:{id:Number(id.id)}});

            const createproduct = await this.prisma.product.update({
                where:{id:Number(id.id)},
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

            if (file) {
                if (getproduct?.image && getproduct?.image !== "") {
                    const oldfindpath = join(__dirname, '..', '..', 'uploads', getproduct?.image);
                    await unlink(oldfindpath);
                }
                
                let imagePath: string | undefined;
                imagePath = join(__dirname, '..', '..', 'uploads', fileName + "");
                await writeFile(imagePath, file.buffer);
            }

            return(createproduct);
        }
        catch(err) {
            if (err.code === "P2002") {
                throw new BadRequestException(err.code);
            }

            throw new BadRequestException(err.message);
        }
    }

    async delproduct(id:{id:string}) {
        try{
            const getproduct = await this.prisma.product.findUnique({where:{id:Number(id.id)}});
            const delproduct = await this.prisma.product.delete({where:{id:Number(id.id)}});

            if (getproduct?.image && getproduct?.image !== "") {
                const oldfindpath = join(__dirname, '..', '..', 'uploads', getproduct?.image);
                await unlink(oldfindpath);
            }

            return;
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async searchproduct(query) {
        try{
            const searchproduct = await this.prisma.product.findMany({
                where:{
                    name:{
                        contains:query.search.toLowerCase(),
                    }
                },
                include:{category:true},
                orderBy:{id:"desc"}
            });

            return(searchproduct);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async getproductbybarcode(barcode:{barcode:string}) {
        try{
            const getproduct = await this.prisma.product.findFirst({where:{barcode:barcode.barcode}});
            
            return(getproduct);
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }

    async endofsale(data:{allproductinfo:ProductInfoType[]}) {
        try{
            console.log(data.allproductinfo);

            //update stock
            Promise.all(data.allproductinfo.map( async (e,i:number) => {
                const getproduct = await this.prisma.product.findUnique({where:{id:e.id}});

                if (getproduct?.stock) {
                    const updatestock = await this.prisma.product.update({
                        where:{id:e.id},
                        data:{
                            stock:getproduct?.stock - e.quantity
                        }
                    });
                }
            }));

            //create end of sale
            Promise.all(data.allproductinfo.map( async (e,i:number) => {
                //const create = await this.prisma
            }));
        }
        catch(err) {
            throw new BadRequestException(err.message);
        }
    }
}