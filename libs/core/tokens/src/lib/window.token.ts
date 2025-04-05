import { InjectionToken } from "@angular/core";

export const WINDOW_TOKEN: InjectionToken<WindowToken> = new InjectionToken<WindowToken>('WINDOW_TOKEN');

export interface WindowToken {
  innerWidth: number;
  addEventListener: (event: string, func: () => void) => void;
  scrollTo: (x: number, y: number) => void;
}