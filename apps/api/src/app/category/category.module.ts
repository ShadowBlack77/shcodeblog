import { Module } from "@nestjs/common";
import { CategoryService } from "./repository/category.service";
import { CategoryController } from "./controller/category.controller";

@Module({
  imports: [],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}