import { Component, inject, OnInit, Signal, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { PostState, selectAllFeaturedPosts } from "../../store/post/post.state";
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from "../../models/post/post.model";
import { gsap } from 'gsap';

@Component({
  selector: 'lib-post-featured-list-section',
  templateUrl: './post-featured-list-section.component.html',
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class PostFeaturedListSectionComponent implements OnInit {

  private readonly _postStore: Store<PostState> = inject(Store);

  featuredPosts$: Signal<Post[] | undefined> = toSignal(this._postStore.select(selectAllFeaturedPosts));

  ngOnInit(): void {
    gsap.fromTo('#hero', {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.5,
      delay: 0.25,
      ease: 'power2.inOut'
    })
  }
}