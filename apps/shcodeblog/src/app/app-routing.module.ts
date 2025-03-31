import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageModule } from "./pages/home/home-page.module";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => HomePageModule
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule {}