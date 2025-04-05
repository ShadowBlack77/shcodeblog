import { createReducer, on } from "@ngrx/store";
import { AUTH_INIT_AUTH_STATE } from "./auth.state";
import { AuthActions } from "./auth.actions";

export const AuthReducer = createReducer(
  AUTH_INIT_AUTH_STATE,
  on(AuthActions.authGetUserSuccessfully, (state, actions) => {
    return {
      ...state,
      user: actions.user
    }
  }),
  on(AuthActions.authSignIn, (state) => {
    return {
      ...state,
      message: null,
      error: null
    }
  }),
  on(AuthActions.authSignInFailure, (state, actions) => {
    return {
      ...state,
      message: null,
      error: actions.error
    }
  }),
  on(AuthActions.authSignUp, (state) => {
    return {
      ...state,
      error: null
    }
  }),
  on(AuthActions.authSignUpFailure, (state, actions) => {
    return {
      ...state,
      error: actions.error
    }
  }),
  on(AuthActions.authSignOutSuccessfully, (state) => {
    return {
      ...state,
      user: undefined
    }
  }),
  on(AuthActions.authResetPassword, (state) => {
    return {
      ...state,
      message: null,
      error: null
    }
  }),
  on(AuthActions.authResetPasswordSuccessfully, (state, actions) => {
    return {
      ...state,
      message: actions.message,
      error: null
    }
  }),
  on(AuthActions.authResetPasswordFailure, (state, actions) => {
    return {
      ...state,
      message: null,
      error: actions.error
    }
  }),
  on(AuthActions.updateUserLikesSuccessfully, (state, actions) => {

    if (!state.user) {
      return {
        ...state
      }
    }
    
    const isCurrentlyLiked = state.user.likedPosts.some((posts: { id: string }) => posts.id === actions.postId);

    return {
      ...state,
      user: isCurrentlyLiked ? 
        { ...state.user, likedPosts: [...state.user.likedPosts.filter((posts: { id: string }) => posts.id !== actions.postId)] } :
        { ...state.user, likedPosts: [...state.user.likedPosts, { id: actions.postId }] }
    }
  }),
  on(AuthActions.updateUserSavesSuccessfully, (state, actions) => {

    if (!state.user) {
      return {
        ...state
      }
    }

    const isCurrentlySaved = state.user.savedPosts.some((posts: { id: string }) => posts.id === actions.postId);

    return {
      ...state,
      user: isCurrentlySaved ?
        { ...state.user, savedPosts: [...state.user.savedPosts.filter((posts: { id: string }) => posts.id !== actions.postId)] } :
        { ...state.user, savedPosts: [...state.user.savedPosts, { id: actions.postId }] }
    }
  })
);