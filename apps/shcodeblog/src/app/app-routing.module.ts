import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RootModule } from "./root/root.module";
import { NotFoundComponent } from "./root/pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => RootModule
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RootModule,
    NotFoundComponent
  ],
})
export class AppRoutingModule {}