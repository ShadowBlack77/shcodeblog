import { NgModule } from "@angular/core";
import { ResetPasswordPageComponent } from "./reset-password-page.component";
import { RouterModule, Routes } from "@angular/router";
import { ResetPasswordFormModule } from "@shcodeblog/auth";

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordPageComponent
  }
]

@NgModule({
  declarations: [ResetPasswordPageComponent],
  imports: [
    RouterModule.forChild(routes),
    ResetPasswordFormModule
  ],
})
export class ResetPasswordModule {}