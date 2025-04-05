import { Component, inject, OnDestroy, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { delay, map, Subject, takeUntil, tap } from "rxjs";
import { AuthState, selectError } from "../../store/auth.state";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordStrengthValidator } from "../../validators/password-strength.validator";
import { AuthActions } from "../../store/auth.actions";

@Component({
  selector: 'lib-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  standalone: false
})
export class SignUpFormComponent implements OnDestroy {
  
  private readonly _authStore: Store<AuthState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  isSubmitting: WritableSignal<boolean> = signal(false);
  formError: WritableSignal<string | null> = signal(null);

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
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
        Validators.minLength(8),
        passwordStrengthValidator()
      ]
    })
  });

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.isSubmitting.set(true);

      this._authStore.dispatch(AuthActions.authSignUp({ ...this.signUpForm.getRawValue() }));

      this._authStore.select(selectError).pipe(
        takeUntil(this._destroy$),
        map((res) => {
          this.formError.set(res);
        }),
        delay(200),
        tap(() => {
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