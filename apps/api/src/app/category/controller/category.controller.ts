import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CategoryService } from "../repository/category.service";
import { Public } from "../../common/public.decorator";

@Controller('categories')
export class CategoryController {

  constructor(private readonly _categoryService: CategoryService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this._categoryService.getAll();
  }
}