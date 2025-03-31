import { InjectionToken } from "@angular/core";

export const ENV_CONFIG: InjectionToken<EnvConfig> = new InjectionToken<EnvConfig>('ENV_CONFIG');

export interface EnvConfig {
  readonly apiUrl: string;
  readonly apiKey: string;
  readonly firebaseConfig: {
    readonly projectId: string;
    readonly appId: string;
    readonly storageBucket: string;
    readonly apiKey: string,
    readonly authDomain: string;
    readonly messagingSenderId: string;
    readonly measurementId: string;
  }
}