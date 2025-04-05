import { Component, OnInit } from "@angular/core";
import { gsap } from 'gsap';

@Component({
  selector: 'app-about',
  templateUrl: './about-page.component.html',
  standalone: false
})
export class AboutPageComponent implements OnInit {

  ngOnInit(): void {
    gsap.fromTo('#about', {
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.25,
      delay: 0.25,
      ease: 'power2.inOut'
    });
  }
}