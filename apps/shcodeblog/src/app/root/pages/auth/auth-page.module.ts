import { NgModule } from "@angular/core";
import { AuthPageComponent } from "./auth-page.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/sign-in-page.module').then((m) => {
          return m.SignInPageModule;
        })
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/sign-up-page.module').then((m) => {
          return m.SignUpPageModule;
        })
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./reset-password/reset-password-page.module').then((m) => {
          return m.ResetPasswordModule;
        })
      }
    ]
  }
];

@NgModule({
  declarations: [AuthPageComponent],
  imports: [RouterModule.forChild(routes)]
})
export class AuthPageModule {}