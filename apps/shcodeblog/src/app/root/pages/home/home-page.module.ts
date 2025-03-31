import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
]

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomePageModule {}