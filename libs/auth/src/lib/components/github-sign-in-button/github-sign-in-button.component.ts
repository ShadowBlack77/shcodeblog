import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "../../store/auth.state";
import { AuthActions } from "../../store/auth.actions";

@Component({
  selector: 'lib-github-sign-in-button',
  templateUrl: './github-sign-in-button.component.html'
})
export class GithubSignInButtonComponent {

  private readonly _authStore: Store<AuthState> = inject(Store);
  
  signInWithGithub(): void {
    this._authStore.dispatch(AuthActions.authSignInWithGithub());
  }
}