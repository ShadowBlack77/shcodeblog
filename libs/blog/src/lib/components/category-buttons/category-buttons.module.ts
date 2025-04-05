import { NgModule } from "@angular/core";
import { CategoryButtonsComponent } from "./category-buttons.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CategoryReducer } from "../../store/category/category.reducers";
import { CategoryEffects } from "../../store/category/category.effects";

@NgModule({
  imports: [
    StoreModule.forFeature('category', CategoryReducer),
    EffectsModule.forFeature([CategoryEffects])
  ],
  declarations: [CategoryButtonsComponent],
  exports: [CategoryButtonsComponent]
})
export class CategoryButtonsModule {}