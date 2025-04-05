import { Component, inject, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { PostState, selectPostsCount } from "../../store/post/post.state";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'lib-featued-section',
  templateUrl: './featured-section.component.html',
  standalone: false
})
export class FeaturedSectionComponent {

  private readonly _postStore: Store<PostState> = inject(Store);

  public postsCount$: Signal<number | undefined> = toSignal(this._postStore.select(selectPostsCount));
}