import { Component, inject, OnDestroy, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, delay, map, Subject, takeUntil, tap } from "rxjs";
import { AuthState, selectError, selectMessage } from "../../store/auth.state";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthActions } from "../../store/auth.actions";

@Component({
  selector: 'lib-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  standalone: false
})
export class ResetPasswordFormComponent implements OnDestroy {

  private readonly _authStore: Store<AuthState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  isSubmitting: WritableSignal<boolean> = signal(false);
  formMessage: WritableSignal<string | null> = signal(null);
  formError: WritableSignal<string | null> = signal(null);

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    })
  });

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.isSubmitting.set(true);

      this._authStore.dispatch(AuthActions.authResetPassword({ ...this.resetPasswordForm.getRawValue() }));

      combineLatest([
        this._authStore.select(selectMessage),
        this._authStore.select(selectError)
      ]).pipe(
        takeUntil(this._destroy$),
        map(([message, error]) => {
          this.formMessage.set(message);
          this.formError.set(error);
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