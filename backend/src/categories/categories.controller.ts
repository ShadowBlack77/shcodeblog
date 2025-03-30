import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from 'src/common/public.decorator';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly _categoriesService: CategoriesService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this._categoriesService.getAll();
  }
}
