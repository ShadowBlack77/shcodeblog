import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "../store/auth.state";
import { AuthActions } from "../store/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  
  private readonly _authStore: Store<AuthState> = inject(Store);

  init(): void {
    this._authStore.dispatch(AuthActions.authGetUser());
  }
}