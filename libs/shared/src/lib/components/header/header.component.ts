import { Component, inject, OnInit } from "@angular/core";
import { NavMenuService } from "../../services/nav-menu.service";
import { gsap } from 'gsap';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  standalone: false
})
export class HeaderComponent implements OnInit {

  private readonly _navMenuService: NavMenuService = inject(NavMenuService);

  ngOnInit(): void {
    gsap.fromTo('#nav', {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.25,
      delay: 0.25,
      ease: 'power2.inOut'
    });
  }

  toggleMenu(): void {
    this._navMenuService.isMenuOpen$.next(!this._navMenuService.isMenuOpen$.getValue())
  }
}