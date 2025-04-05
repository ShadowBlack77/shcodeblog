import { Component, inject, OnDestroy, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subject, takeUntil } from "rxjs";
import { AuthState, selectError } from "../../store/auth.state";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthActions } from "../../store/auth.actions";

@Component({
  selector: 'lib-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  standalone: false
})
export class SignInFormComponent implements OnDestroy {

  private readonly _authStore: Store<AuthState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  isSubmitting: WritableSignal<boolean> = signal(false);
  formError: WritableSignal<string | null> = signal(null);

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    })
  });

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.isSubmitting.set(true);

      this._authStore.dispatch(AuthActions.authSignIn({ ...this.signInForm.getRawValue() }));

      this._authStore.select(selectError).pipe(
        takeUntil(this._destroy$),
        map((error) => {
          this.formError.set(error);
          this.isSubmitting.set(false);
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}