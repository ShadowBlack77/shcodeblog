import { Component, inject, OnInit, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { PostState, selectPostsCount } from "../../store/post/post.state";
import { toSignal } from "@angular/core/rxjs-interop";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'lib-featued-section',
  templateUrl: './featured-section.component.html',
  standalone: false
})
export class FeaturedSectionComponent implements OnInit {

  private readonly _postStore: Store<PostState> = inject(Store);

  public postsCount$: Signal<number | undefined> = toSignal(this._postStore.select(selectPostsCount));

  ngOnInit(): void {
    gsap.fromTo('#features', {
      opacity: 0
    }, {
    opacity: 1,
      ease: 'power2.inOut',
      delay: 0.25,
      duration: 0.5,
      scrollTrigger: {
        trigger: '#features',
        start: 'top 100%',
        end: 'top 30%',
        toggleActions: 'play none none none'
      }
    });
  }
}