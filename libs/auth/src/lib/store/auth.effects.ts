import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { AuthActions } from "./auth.actions";
import { catchError, map, of, switchMap, take } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.state";

@Injectable()
export class AuthEffects {

  private readonly _actions$: Actions = inject(Actions);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  private readonly _authStore: Store<AuthState> = inject(Store);

  signIn$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.authSignIn),
      switchMap((signInDto) => {
        return this._authService.signIn(signInDto).pipe(
          take(1),
          map(() => {
            this._authStore.dispatch(AuthActions.authGetUser());
            this._router.navigate(['/']);

            return AuthActions.authSignInSuccessfully();
          }),
          catchError(() => {
            return of(AuthActions.authSignInFailure({ error: 'Invalid Credentials' }));
          })
        )
      })
    )
  });

  signUp$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.authSignUp),
      switchMap((signUpDto) => {
        return this._authService.signUp(signUpDto).pipe(
          take(1),
          map(() => {
            this._router.navigate(['/auth/sign-in']);

            return AuthActions.authSignUpSuccessfully();
          }),
          catchError(() => {
            return of(AuthActions.authSignUpFailure({ error: 'Email zajęty. Użyj innego' }));
          })
        )
      })
    )
  });

  signInWithGoogle$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.authSignInWithGoogle),
      switchMap(() => {
        return this._authService.signInGoogle().pipe(
          take(1),
          map(() => {
            this._authStore.dispatch(AuthActions.authGetUser());
            this._router.navigate(['/']);

            return AuthActions.authSignInWithGoogleSuccessfully();
          }),
          catchError(() => {
            return of(AuthActions.authSignInWithGoogleFailure({ error: 'Cannot sing in with google' }));
          })
        )
      })
    )
  });

  signInWithGithub$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.authSignInWithGithub),
      switchMap(() => {
        return this._authService.signInGithub().pipe(
          take(1),
          map(() => {
            this._authStore.dispatch(AuthActions.authGetUser());
            this._router.navigate(['/']);

            return AuthActions.authSignInWithGithubSuccessfully();
          }),
          catchError(() => {
            return of(AuthActions.authSignInWithGithubFailure({ error: 'Cannot sing in with github' }))
          })
        )
      })
    )
  });

  signOut$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.authSignOut),
      switchMap(() => {
        return this._authService.signOut().pipe(
          take(1),
          map(() => {
            return AuthActions.authSignOutSuccessfully()
          }),
          catchError(() => {
            return of(AuthActions.authSignOutFailure({ error: 'Cannot sign out' }));
          })
        )
      })
    )
  })

  getUser$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.authGetUser),
      switchMap(() => {
        return this._authService.profile().pipe(
          take(1),
          map((res) => {
            return AuthActions.authGetUserSuccessfully({ user: res });
          }),
          catchError(() => {
            return of(AuthActions.authGetUserFailure({ error: 'Cannot get User' }));
          })
        )
      })
    )
  });

  resetPassword$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.authResetPassword),
      switchMap(({ email }) => {
        return this._authService.resetPassword(email).pipe(
          take(1),
          map(() => {
            return AuthActions.authResetPasswordSuccessfully({ message: 'Wiadomość wysłana!' });
          }),
          catchError(() => {
            return of(AuthActions.authResetPasswordFailure({ error: 'Błąd podczas wysyłania wiadomości!' }));
          })
        )
      })
    )
  });

  userLikePosts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.updateUserLikes),
      map((postId) => {
        return AuthActions.updateUserLikesSuccessfully(postId);
      }),
      catchError(() => {
        return of(AuthActions.updateUserLikesFailure({ error: 'Cannot like post' }));
      })
    )
  });
  
  userSavePosts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.updateUserSaves),
      map((postId) => {
        return AuthActions.updateUserSavesSuccessfully(postId);
      }),
      catchError(() => {
        return of(AuthActions.updateUserSavesFailue({ error: 'Cannot save post' }))
      })
    )
  });
}