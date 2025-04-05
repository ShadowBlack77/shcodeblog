import { APP_INITIALIZER, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppPageComponent } from "./app-page.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ENV_CONFIG } from '@shcodeblog/core/environment'
import { environment } from "../environments/environment";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthEffects, AuthInterceptor, AuthReducer, AuthStateService } from "@shcodeblog/auth";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WINDOW_TOKEN } from '@shcodeblog/core/tokens';

@NgModule({
  declarations: [
    AppPageComponent
  ],
  imports: [
    StoreModule.forRoot({
      'auth': AuthReducer
    }),
    EffectsModule.forRoot([
      AuthEffects
    ]),
    BrowserModule, 
    RouterModule,
    AppRoutingModule,
  ],
  bootstrap: [AppPageComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() =>  getAuth()),
    {
      provide: ENV_CONFIG,
      useValue: {
        apiUrl: environment.apiUrl,
        apiKey: environment.apiKey
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authStateService: AuthStateService) => {
        return () => authStateService.init();
      },
      multi: true,
      deps: [AuthStateService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: WINDOW_TOKEN,
      useValue: window
    },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth())
  ]
})
export class AppModule {}