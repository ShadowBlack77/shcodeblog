import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {

  private readonly _destroy$: Subject<void> = new Subject<void>();

  isMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}