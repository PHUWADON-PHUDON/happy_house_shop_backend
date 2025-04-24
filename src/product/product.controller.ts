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

  @Get("search")
  searchproduct(@Query() query) {
    return this.productService.searchproduct(query);
  }

  @Get("searchbarcode/:barcode")
  getproductbybarcode(@Param() barcode) {
    return this.productService.getproductbybarcode(barcode);
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

  @Delete(":id")
  delproduct(@Param() id) {
    return this.productService.delproduct(id);
  }

  @Post("/endofsale")
  endofsale(@Body() data) {
    return this.productService.endofsale(data);
  }
}