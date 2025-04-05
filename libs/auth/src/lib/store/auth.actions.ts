import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const AuthActions = createActionGroup({
  source: 'auth',
  events: {
    'auth sign in': props<{
      email: string,
      password: string
    }>(),
    'auth sign in successfully': emptyProps(),
    'auth sign in failure': props<{ error: string }>(),

    'auth sign up': props<{
      username: string;
      email: string;
      password: string;
    }>(),
    'auth sign up successfully': emptyProps(),
    'auth sign up failure': props<{ error: string }>(),

    'auth sign in with google': emptyProps(),
    'auth sign in with google successfully': emptyProps(),
    'auth sign in with google failure': props<{ error: string }>(),

    'auth sign in with github': emptyProps(),
    'auth sign in with github successfully': emptyProps(),
    'auth sign in with github failure': props<{ error: string }>(),

    'auth get user': emptyProps(),
    'auth get user successfully': props<{ user: User }>(),
    'auth get user failure': props<{ error: string }>(),

    'auth sign out': emptyProps(),
    'auth sign out successfully': emptyProps(),
    'auth sign out failure': props<{ error: string }>(),

    'auth reset password': props<{ email: string }>(),
    'auth reset password successfully': props<{ message: string }>(),
    'auth reset password failure': props<{ error: string }>(),

    'update user likes': props<{ postId: string }>(),
    'update user likes successfully': props<{ postId: string }>(),
    'update user likes failure': props<{ error: string }>(),

    'update user saves': props<{ postId: string }>(),
    'update user saves successfully': props<{ postId: string }>(),
    'update user saves failue': props<{ error: string }>()
  }
});