import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AuthState, selectUser } from '../../store/auth.state';
import { map, Subject, takeUntil } from 'rxjs';
import { NavMenuService } from '@shcodeblog/shared';
import { AuthActions } from '../../store/auth.actions';

@Component({
  selector: 'lib-auth-header-segment',
  templateUrl: './auth-header-segment.component.html',
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class AuthHeaderSegmentComponent implements OnInit, OnDestroy {

  private readonly _authStore: Store<AuthState> = inject(Store);
  private readonly _navMenuService: NavMenuService = inject(NavMenuService);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  user: WritableSignal<User | undefined> = signal(undefined);

  ngOnInit(): void {
    this._authStore.select(selectUser).pipe(
      takeUntil(this._destroy$),
      map((user) => {
        this.user.set(user);
      })
    ).subscribe();
  }

  handleClick(): void {
    this._navMenuService.isMenuOpen$.next(false);
  }

  signOut() {
    this._navMenuService.isMenuOpen$.next(false);
    this._authStore.dispatch(AuthActions.authSignOut());
  }


  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}