import { Component, signal, WritableSignal } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  standalone: false
})
export class HomePageComponent {

  selectedCategory: WritableSignal<string> = signal('all');

  handleCategoryChange(event: string): void {
    this.selectedCategory.set(event);
  }
}