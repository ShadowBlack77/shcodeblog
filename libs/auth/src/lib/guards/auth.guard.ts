import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState, selectUser } from '../store/auth.state';
import { inject } from '@angular/core';
import { catchError, map, of, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const _authStore: Store<AuthState> = inject(Store);
  const _router: Router = inject(Router);

  return _authStore.select(selectUser).pipe(
    take(1),
    map((user) => {
      if (user) {
        _router.navigate(['/']);

        return false;
      }

      return true;
    }),
    catchError(() => {      
      return of(true);
    })
  );
};
