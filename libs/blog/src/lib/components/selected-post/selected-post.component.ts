import { Component, effect, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { PostState, selectPost } from "../../store/post/post.state";
import { map, Subject, takeUntil } from "rxjs";
import { PostActions } from "../../store/post/post.actions";
import { Post } from "../../models/post/post.model";

@Component({
  selector: 'lib-selected-post',
  templateUrl: './selected-post.component.html',
  standalone: false,
})
export class SelectedPostComponent implements OnInit, OnDestroy {

  private readonly _postStore: Store<PostState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  postId: InputSignal<string | undefined> = input<string | undefined>(undefined);
  post: WritableSignal<Post | undefined> = signal(undefined);

  outputLikedBy: OutputEmitterRef<{ uid: string }[]> = output<{ uid: string }[]>();
  outputSavedBy: OutputEmitterRef<{ uid: string }[]> = output<{ uid: string }[]>();

  inputUserLike: InputSignal<{ postId: string, userId: string } | undefined> = input<{ postId: string, userId: string } | undefined>();
  inputUserSave: InputSignal<{ postId: string, userId: string } | undefined> = input<{ postId: string, userId: string } | undefined>();

  constructor() {
    effect(() => {
      const inputUserLike = this.inputUserLike();
      
      if (inputUserLike) {
        this._postStore.dispatch(PostActions.likePost({ ...inputUserLike }));
      }
    })

    effect(() => {
      const inputUserSave = this.inputUserSave();

      if (inputUserSave) {
        this._postStore.dispatch(PostActions.savePost({ ...inputUserSave }));
      }
    })
  }
 
  ngOnInit(): void {
    if (this.postId()) {
      this._postStore.dispatch(PostActions.fetchSelectedPost({ id: this.postId() ?? '' }));

      this._postStore.select(selectPost).pipe(
        takeUntil(this._destroy$),
        map((post) => {
          if (post) {
            this.post.set(post);

            this.outputLikedBy.emit(post.likedBy);
            this.outputSavedBy.emit(post.savedBy);
          }
        })
      ).subscribe();
    }
  }

  getPostDate(postDate: { _seconds: number, _nanoseconds: number }): string {
    if (!postDate || typeof postDate._seconds !== 'number') {
      return 'Brak daty';
    }
  
    const creationDate = new Date(postDate._seconds * 1000);
  
    return `${ creationDate.getDate().toString().padStart(2, '0') }.${ (creationDate.getMonth() + 1).toString().padStart(2, '0') }.${ creationDate.getFullYear() }`;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}