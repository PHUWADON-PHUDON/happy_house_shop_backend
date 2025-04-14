import { Controller,Get,Post,Body,Patch,Param,Delete,Query,UseInterceptors,UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createproduct(@Body() data,@UploadedFile() file:Express.Multer.File) {
    return this.productService.createproduct(data,file);
  }
}