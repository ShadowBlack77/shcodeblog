import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "../../store/auth.state";
import { AuthActions } from "../../store/auth.actions";

@Component({
  selector: 'lib-google-sign-in-button',
  templateUrl: './google-signin-button.component.html'
})
export class GoogleSignInButtonComponent {

  private readonly _authStore: Store<AuthState> = inject(Store);

  signInWithGoogle(): void {
    this._authStore.dispatch(AuthActions.authSignInWithGoogle());
  }

}