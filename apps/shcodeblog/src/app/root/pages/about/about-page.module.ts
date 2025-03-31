import { NgModule } from "@angular/core";
import { AboutPageComponent } from "./about-page.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  }
]

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class AboutPageModule {}