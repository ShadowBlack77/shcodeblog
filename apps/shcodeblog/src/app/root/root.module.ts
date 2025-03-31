import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RootComponent } from "./root.component";
import { FooterModule, HeaderModule } from '@shcodeblog/shared';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home-page.module').then((m) => {
          return m.HomePageModule;
        })
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about/about-page.module').then((m) => {
          return m.AboutPageModule;
        })
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile-page.module').then((m) => {
          return m.ProfilePageModule;
        })
      }
    ]
  },
]

@NgModule({
  declarations: [RootComponent],
  imports: [
    RouterModule.forChild(routes),
    RouterModule,
    FooterModule,
    HeaderModule
  ]
})
export class RootModule {}