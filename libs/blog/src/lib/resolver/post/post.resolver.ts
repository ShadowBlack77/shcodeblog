import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostState } from '../../store/post/post.state';
import { PostActions } from '../../store/post/post.actions';

export const postResolver: ResolveFn<boolean> = () => {

  const _postStore: Store<PostState> = inject(Store);

  _postStore.dispatch(PostActions.fetchAllFeaturedPosts());
  _postStore.dispatch(PostActions.fetchAllPosts({
    featured: 'all',
    category: 'all',
    page: 1,
    size: 10
  }));

  _postStore.dispatch(PostActions.fetchPostsCount());

  return true;
}