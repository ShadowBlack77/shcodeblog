import { Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState, selectUser } from "../../store/auth.state";
import { map, Subject, takeUntil } from "rxjs";
import { User } from "../../models/user.model";
import { Router } from "@angular/router";
import { AuthActions } from "../../store/auth.actions";

@Component({
  selector: 'lib-user-post-button-actions',
  templateUrl: './user-post-button-actions.component.html',
  standalone: false
})
export class UserPostButtonActionsComponent implements OnInit, OnDestroy {

  private readonly _authStore: Store<AuthState> = inject(Store);
  private readonly _router: Router = inject(Router);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  user: WritableSignal<User | undefined> = signal(undefined);
  likedBy: InputSignal<{ uid: string }[] | undefined> = input<{ uid: string }[] | undefined>();
  savedBy: InputSignal<{ uid: string }[] | undefined> = input<{ uid: string }[] | undefined>();
  postId: InputSignal<string> = input<string>('');
  outputLikeEvent: OutputEmitterRef<{ postId: string, userId: string }> = output<{ postId: string, userId: string }>();
  outputSaveEvent: OutputEmitterRef<{ postId: string, userId: string }> = output<{ postId: string, userId: string }>();

  ngOnInit(): void {
    this._authStore.select(selectUser).pipe(
      takeUntil(this._destroy$),
      map((user) => {
        this.user.set(user);
      })
    ).subscribe();
  }

  renderLikeButton(): boolean {
    const user = this.user();
    const likedBy = this.likedBy();

    if (user && likedBy) {
      return user && likedBy.some((users: { uid: string }) => users.uid === user.uid);
    }

    return false;
  }

  renderSaveButton(): boolean {
    const user = this.user();
    const savedBy = this.savedBy();

    if (user && savedBy) {
      return user && savedBy.some((users: { uid: string }) => users.uid === user.uid);
    }

    return false;
  }

  handleClickLike(): void {
    const user = this.user();

    if (!user) {
      this._router.navigate(['/auth/sign-in']);

      return;
    }

    this.outputLikeEvent.emit({ postId: this.postId(), userId: user.uid });
    this._authStore.dispatch(AuthActions.updateUserLikes({ postId: this.postId() }))
  }

  handleClickSave(): void {
    const user = this.user();

    if (!user) {
      this._router.navigate(['/auth/sign-in']);

      return;
    }

    this.outputSaveEvent.emit({ postId: this.postId(), userId: user.uid });
    this._authStore.dispatch(AuthActions.updateUserSaves({ postId: this.postId() }));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}