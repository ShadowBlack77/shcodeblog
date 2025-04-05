import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostActions } from "./post.actions";
import { catchError, map, of, switchMap, take } from "rxjs";
import { PostService } from "../../services/post/post.service";

@Injectable()
export class PostEffects {

  private readonly _actions$: Actions = inject(Actions);
  private readonly _postService: PostService = inject(PostService);
  // private readonly _authStore: Store<AuthState> = inject(Store);

  fetchAllFeatuedPosts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.fetchAllFeaturedPosts),
      switchMap(() => {
        return this._postService.getAll('true', 'all', 1, 10).pipe(
          take(1),
          map((res) => {
            return PostActions.fetchAllFeaturedPostsSuccessfully({ post: res });
          }),
          catchError(() => {
            return of(PostActions.fetchAllFeaturedPostsFailure({ error: 'Cannot fetch posts' }));
          })
        )
      })
    )
  });

  fetchAllPosts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.fetchAllPosts),
      switchMap(({ featured, category, size, page }) => {
        return this._postService.getAll(featured, category, page, size).pipe(
          take(1),
          map((res) => {
            return PostActions.fetchAllPostsSuccessfully({ post: res });
          }),
          catchError(() => {
            return of(PostActions.fetchAllPostsFailure({ error: 'Cannot fetch all posts' }));
          })
        )
      })
    )
  });

  fetchPostsCount$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.fetchPostsCount),
      switchMap(() => {
        return this._postService.count().pipe(
          take(1),
          map((res) => {
            return PostActions.fetchPostsCountSuccessfully({ allPosts: res.allPosts });
          }),
          catchError(() => {
            return of(PostActions.fetchPostsCountFailure({ error: 'Cannot fetch post count' }));
          })
        )
      })
    )
  });

  fetchSelectedPost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.fetchSelectedPost),
      switchMap(({ id }) => {
        return this._postService.get(id).pipe(
          take(1),
          map((res) => {
            return PostActions.fetchSelectedPostSuccessfully({ post: res });
          }),
          catchError(() => {
            return of(PostActions.fetchSelectedPostFailure({ error: 'Cannot fetch selected post' }));
          })
        )
      })
    )
  });

  likePost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.likePost),
      switchMap(({ postId }) => {
        return this._postService.like(postId).pipe(
          take(1),
          map(() => {

            return PostActions.likePostSuccessfully();
          }),
          catchError(() => {
            return of(PostActions.likePostFailure({ error: 'Cannot like post' }));
          })
        )
      })
    )
  });

  savePost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.savePost),
      switchMap(({ postId }) => {
        return this._postService.save(postId).pipe(
          take(1),
          map(() => {

            return PostActions.savePostSuccessfully();
          }),
          catchError(() => {
            return of(PostActions.savePostFailure({ error: 'Cannot save post' }));
          })
        )
      })
    )
  })
}