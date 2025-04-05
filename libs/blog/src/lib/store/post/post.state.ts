import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post } from "../../models/post/post.model";

export interface PostState {
  readonly featuredPosts: Post[];
  readonly postsList: Post[];
  readonly postsCount: number;
  readonly selectedPost: Post | undefined;
}

export const POST_INIT_STATE: PostState = {
  featuredPosts: [],
  postsList: [],
  postsCount: 0,
  selectedPost: undefined
}

const selectPostState = createFeatureSelector<PostState>('post');

export const selectAllFeaturedPosts = createSelector(selectPostState, (state: PostState) => {
  return state.featuredPosts;
});
export const selectPostsList = createSelector(selectPostState, (state: PostState) => {
  return state.postsList;
});
export const selectPostsCount = createSelector(selectPostState, (state: PostState) => {
  return state.postsCount;
});
export const selectPost = createSelector(selectPostState, (state: PostState) => {
  return state.selectedPost;
});