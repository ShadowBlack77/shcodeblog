import { NgModule } from "@angular/core";
import { AboutPageComponent } from "./about-page.component";
import { RouterModule, Routes } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent
  }
]

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    RouterModule.forChild(routes),
    NgOptimizedImage
  ],
})
export class AboutPageModule {}