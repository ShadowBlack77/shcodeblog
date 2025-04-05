import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpPageComponent } from "./sign-up-page.component";
import { SignUpFormModule } from "@shcodeblog/auth";

const routes: Routes = [
  {
    path: '',
    component: SignUpPageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SignUpFormModule
  ],
  declarations: [SignUpPageComponent]
})
export class SignUpPageModule {}