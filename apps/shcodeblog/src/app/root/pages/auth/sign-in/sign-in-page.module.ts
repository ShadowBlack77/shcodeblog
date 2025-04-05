import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInPageComponent } from "./sign-in-page.component";
import { GithubSignInButtonComponent, GoogleSignInButtonComponent, SignInFormModule } from "@shcodeblog/auth";

const routes: Routes = [
  {
    path: '',
    component: SignInPageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SignInFormModule,
    GithubSignInButtonComponent,
    GoogleSignInButtonComponent
  ],
  declarations: [SignInPageComponent]
})
export class SignInPageModule {}