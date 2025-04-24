import { Controller,Get,Post,Body,Patch,Param,Delete,Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService:CategoryService) {}

  @Get()
  getallcategory() {
    return this.categoryService.getallcategory();
  }

  @Post()
  createcategory(@Body() data) {
    return this.categoryService.createcategory(data);
  }

  @Patch(":id")
  updatecategory(@Param("id") id:string,@Body() data) {
    return this.categoryService.updatecategory(id,data);
  }

  @Delete(":id")
  delcategory(@Param("id") id:string) {
    return this.categoryService.delcategory(id);
  }

  // @Get("search")
  // searchcategory(@Query() query:any) {
  //   return this.categoryService.searchcategory(query);
  // }
}
