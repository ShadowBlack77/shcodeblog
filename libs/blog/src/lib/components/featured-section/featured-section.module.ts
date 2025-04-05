import { NgModule } from "@angular/core";
import { FeaturedSectionComponent } from "./featured-section.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { PostReducer } from "../../store/post/post.reducers";
import { PostEffects } from "../../store/post/post.effects";

@NgModule({
  imports: [
    StoreModule.forFeature('post', PostReducer),
    EffectsModule.forFeature([PostEffects])
  ],
  declarations: [FeaturedSectionComponent],
  exports: [FeaturedSectionComponent]
})
export class FeaturedSectionModule {}