import { Component, signal, Signal } from '@angular/core';

@Component({
  selector: 'lib-footer',
  standalone: false,
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  currentDate: Signal<Date> = signal(new Date());

}