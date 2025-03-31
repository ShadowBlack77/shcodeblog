import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile-page.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent
  }
]

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProfilePageModule {}