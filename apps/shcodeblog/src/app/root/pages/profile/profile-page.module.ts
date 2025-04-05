import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile-page.component";
import { RouterModule, Routes } from "@angular/router";
import { UserProfileModule } from "@shcodeblog/auth";

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent
  }
]

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    RouterModule.forChild(routes),
    UserProfileModule
  ]
})
export class ProfilePageModule {}