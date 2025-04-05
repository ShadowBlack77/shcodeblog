import { Component, effect, Inject, inject, input, InputSignal, OnDestroy, OnInit, Signal, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { PostState, selectPostsCount, selectPostsList } from "../../store/post/post.state";
import { map, Subject, takeUntil } from "rxjs";
import { Post } from "../../models/post/post.model";
import { toSignal } from "@angular/core/rxjs-interop";
import { PostActions } from "../../store/post/post.actions";
import { WINDOW_TOKEN, WindowToken } from '@shcodeblog/core/tokens';

@Component({
  selector: 'lib-post-list-section',
  templateUrl: './post-list-section.component.html',
  standalone: false
})
export class PostListSectionComponent implements OnInit, OnDestroy {
  
  private readonly _postStore: Store<PostState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  posts$: WritableSignal<Post[] | undefined> = signal([]);
  postsCount$: Signal<number | undefined> = toSignal(this._postStore.select(selectPostsCount));

  selectedCategory: InputSignal<string> = input('all');
  currentPage: WritableSignal<number> = signal(1);
  selectedPageSize: WritableSignal<number> = signal(10);

  constructor(@Inject(WINDOW_TOKEN) private readonly _windw: WindowToken) {
    effect(() => {
      this._postStore.dispatch(PostActions.fetchAllPosts({
        featured: 'all',
        category: this.selectedCategory(),
        page: this.currentPage(),
        size: this.selectedPageSize()
      }))
    })
  }

  ngOnInit(): void {
    this._postStore.select(selectPostsList).pipe(
      takeUntil(this._destroy$),
      map((posts) => {
        this.posts$.set(posts);
      })
    ).subscribe();
  }

  handlePostClick(): void {
    this._windw.scrollTo(0, 0);
  }

  prev(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  next(): void {
    if (this.currentPage() < Math.round(this.postsCount$() ?? 0 / (this.selectedCategory() === 'all' ? this.selectedPageSize() : ((this.posts$() ?? []).length + 1)))) {
      this.currentPage.update((page) => page + 1);
    }
  }

  setPageSize(event: Event): void {
    const target = event.currentTarget as HTMLSelectElement;

    this.selectedPageSize.set(Number(target.value));
    this.currentPage.set(1);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();  
  }
}