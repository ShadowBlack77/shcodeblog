import { NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PostListSectionComponent } from "./post-list-section.component";
import { StoreModule } from "@ngrx/store";
import { PostReducer } from "../../store/post/post.reducers";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "../../store/post/post.effects";

@NgModule({
  imports: [
    NgOptimizedImage,
    RouterModule,
    StoreModule.forFeature('post', PostReducer),
    EffectsModule.forFeature([PostEffects])
  ],
  declarations: [PostListSectionComponent],
  exports: [PostListSectionComponent]
})
export class PostListSectionModule {}