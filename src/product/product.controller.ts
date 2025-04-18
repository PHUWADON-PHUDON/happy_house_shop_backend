import { Controller,Get,Post,Body,Patch,Param,Delete,Query,UseInterceptors,UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getallproduct() {
    return this.productService.getallproduct();
  }

  @Get(":id")
  getproduct(@Param() id) {
    return this.productService.getproduct(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createproduct(@Body() data,@UploadedFile() file:Express.Multer.File) {
    return this.productService.createproduct(data,file);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor('file'))
  updateproduct(@Param() id,@Body() data,@UploadedFile() file:Express.Multer.File) {
    return this.productService.updateproduct(id,data,file);
  }
}