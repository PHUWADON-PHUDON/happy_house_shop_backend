import { Controller,Get,Post,Body } from '@nestjs/common';
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
}
