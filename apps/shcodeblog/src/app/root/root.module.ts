import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RootComponent } from "./root.component";
import { FooterModule, HeaderModule, NavMenuModule } from '@shcodeblog/shared';
import { authGuard, AuthHeaderSegmentComponent, profileGuard } from '@shcodeblog/auth';
import { categoryResolver, postResolver } from "@shcodeblog/blog";

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    resolve: [postResolver, categoryResolver],
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
        canActivate: [profileGuard],
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile-page.module').then((m) => {
          return m.ProfilePageModule;
        })
      },
      {
        path: 'posts/:id',
        loadChildren: () => import('./pages/post/post-page.module').then((m) => {
          return m.PostPageModule;
        })
      }
    ]
  },
  {
    canActivate: [authGuard],
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-page.module').then((m) => {
      return m.AuthPageModule;
    })
  }
]

@NgModule({
  declarations: [RootComponent],
  imports: [
    RouterModule.forChild(routes),
    RouterModule,
    FooterModule,
    HeaderModule,
    NavMenuModule,
    AuthHeaderSegmentComponent
  ]
})
export class RootModule {}