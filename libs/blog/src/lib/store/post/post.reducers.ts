import { createReducer, on } from "@ngrx/store";
import { POST_INIT_STATE } from "./post.state";
import { PostActions } from "./post.actions";

export const PostReducer = createReducer(
  POST_INIT_STATE,
  on(PostActions.fetchAllFeaturedPostsSuccessfully, (state, actions) => {
    return {
      ...state,
      featuredPosts: actions.post
    }
  }),
  on(PostActions.fetchAllPostsSuccessfully, (state, actions) => {
    return {
      ...state,
      postsList: actions.post
    }
  }),
  on(PostActions.fetchPostsCountSuccessfully, (state, actions) => {
    return {
      ...state,
      postsCount: actions.allPosts
    }
  }),
  on(PostActions.fetchSelectedPostSuccessfully, (state, actions) => {
    return {
      ...state,
      selectedPost: actions.post
    }
  }),
  on(PostActions.likePost, (state, actions) => {

    if (!state.selectedPost) {
      return {
        ...state
      }
    }

    const isCurrentlyLiked = state.selectedPost.likedBy.some((users: { uid: string }) => users.uid === actions.userId);

    return {
      ...state,
      selectedPost: isCurrentlyLiked ? 
        { ...state.selectedPost, likedBy: [...state.selectedPost.likedBy.filter((users: { uid: string }) => users.uid !== actions.userId)] } : 
        { ...state.selectedPost, likedBy: [...state.selectedPost.likedBy, { uid: actions.userId }] }
    }
  }),
  on(PostActions.savePost, (state, actions) => {

    if (!state.selectedPost) {
      return {
        ...state
      }
    }
    
    const isCurrentlySaved = state.selectedPost.savedBy.some((users: { uid: string }) => users.uid === actions.userId)

    return {
      ...state,
      selectedPost: isCurrentlySaved ?
        { ...state.selectedPost, savedBy: [...state.selectedPost.savedBy.filter((users: { uid: string }) => users.uid !== actions.userId)] } :
        { ...state.selectedPost, savedBy: [...state.selectedPost.savedBy, { uid: actions.userId }] }
    }
  })
);