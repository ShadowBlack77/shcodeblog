import { Component, OnInit, signal, WritableSignal } from "@angular/core";
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  standalone: false
})
export class HomePageComponent implements OnInit {

  selectedCategory: WritableSignal<string> = signal('all');

  ngOnInit(): void {
    gsap.fromTo('#post-list-header', {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.5,
      delay: 0.25,
      ease: 'power2.inOut'
    })
  }

  handleCategoryChange(event: string): void {
    this.selectedCategory.set(event);
  }
}