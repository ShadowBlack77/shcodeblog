import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PostFeaturedListSectionComponent } from "./post-featured-list-section.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "../../store/post/post.effects";
import { PostReducer } from "../../store/post/post.reducers";

@NgModule({
  imports: [
    RouterModule, 
    CommonModule,
    StoreModule.forFeature('post', PostReducer),
    EffectsModule.forFeature([PostEffects])
  ],
  declarations: [PostFeaturedListSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PostFeaturedListSectionComponent],
})
export class PostFeaturedListSectionModule {}