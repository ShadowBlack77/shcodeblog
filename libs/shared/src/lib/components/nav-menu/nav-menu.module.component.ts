import { Component, Inject, inject, OnDestroy, OnInit } from "@angular/core";
import { NavMenuService } from "../../services/nav-menu.service";
import { map, Subject, takeUntil } from "rxjs";
import { WINDOW_TOKEN, WindowToken } from '@shcodeblog/core/tokens';
import gsap from 'gsap';

@Component({
  selector: 'lib-nav-menu',
  templateUrl: './nav-menu.module.component.html',
  standalone: false
})
export class NavMenuComponent implements OnInit, OnDestroy {

  private readonly _navMenuService: NavMenuService = inject(NavMenuService);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(WINDOW_TOKEN) private readonly _window: WindowToken) {}

  ngOnInit(): void {

    this._window.addEventListener('resize', () => {
      if (this._window.innerWidth >= 640) {
        this._navMenuService.isMenuOpen$.next(false);
      }
    })

    this._navMenuService.isMenuOpen$.pipe(
      takeUntil(this._destroy$),
      map((isOpened) => {
        if (isOpened) {
          this.showMenu();
        } else {
          this.closeMenu();
        }
      })
    ).subscribe();
  }

  handleClick(): void {
    this._navMenuService.isMenuOpen$.next(false);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private showMenu(): void {
    gsap.to('#nav-menu', {
      opacity: 1,
      top: '52px',
      zIndex: 20,
      duration: 0.25,
    });
  }

  private closeMenu(): void {
    gsap.to('#nav-menu', {
      opacity: 0,
      top: 0,
      zIndex: -40,
      duration: 0.25,
    })
  }
}