import { NgModule } from "@angular/core";
import { SelectedPostComponent } from "./selected-post.component";
import { NgOptimizedImage } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "../../store/post/post.effects";
import { StoreModule } from "@ngrx/store";
import { PostReducer } from "../../store/post/post.reducers";

@NgModule({
  imports: [
    StoreModule.forFeature('post', PostReducer),
    EffectsModule.forFeature([PostEffects]),
    NgOptimizedImage
  ],
  declarations: [SelectedPostComponent],
  exports: [SelectedPostComponent]
})
export class SelectedPostModule {}