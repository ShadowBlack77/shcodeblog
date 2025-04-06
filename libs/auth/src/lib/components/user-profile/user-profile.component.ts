import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState, selectUser } from "../../store/auth.state";
import { map, Subject, takeUntil } from "rxjs";
import { User } from "../../models/user.model";
import { gsap } from 'gsap';

@Component({
  selector: 'lib-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: false
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private readonly _authStore: Store<AuthState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  public user: WritableSignal<User | undefined> = signal(undefined);

  ngOnInit(): void {
    gsap.fromTo('#profile', {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.5,
      delay: 0.25,
      ease: 'power2.inOut'
    });

    this._authStore.select(selectUser).pipe(
      takeUntil(this._destroy$),
      map((user) => {
        this.user.set(user);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}