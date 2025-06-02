import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./root/pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./root/root.module').then(m => m.RootModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    NotFoundComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}