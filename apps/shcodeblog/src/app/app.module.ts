import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppPageComponent } from "./app-page.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ENV_CONFIG } from '@shcodeblog/core/environment'
import { environment } from "../environments/environment";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppPageComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule,
    AppRoutingModule,
  ],
  bootstrap: [AppPageComponent],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() =>  getAuth()),
    {
      provide: ENV_CONFIG,
      useValue: {
        apiUrl: environment.apiUrl,
        apiKey: environment.apiKey
      }
    }
  ]
})
export class AppModule {}