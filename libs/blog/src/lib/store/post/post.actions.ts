import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Post } from "../../models/post/post.model";

export const PostActions = createActionGroup({
  source: 'Post',
  events: {
    'fetch all featured posts': emptyProps(),
    'fetch all featured posts successfully': props<{ post: Post[] }>(),
    'fetch all featured posts failure': props<{ error: string }>(),

    'fetch all posts': props<{
      featured: string,
      category: string,
      page: number,
      size: number
    }>(),
    'fetch all posts successfully': props<{ post: Post[] }>(),
    'fetch all posts failure': props<{ error: string }>(),

    'fetch posts count': emptyProps(),
    'fetch posts count successfully': props<{ allPosts: number }>(),
    'fetch posts count failure': props<{ error: string }>(),

    'fetch selected post': props<{ id: string }>(),
    'fetch selected post successfully': props<{ post: Post }>(),
    'fetch selected post failure': props<{ error: string }>(),

    'like post': props<{ postId: string, userId: string }>(),
    'like post successfully': emptyProps(),
    'like post failure': props<{ error: string }>(),

    'save post': props<{ postId: string, userId: string }>(),
    'save post successfully': emptyProps(),
    'save post failure': props<{ error: string }>()
  }
})