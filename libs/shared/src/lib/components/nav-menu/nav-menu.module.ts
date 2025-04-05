import { NgModule } from "@angular/core";
import { NavMenuComponent } from "./nav-menu.module.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [NavMenuComponent],
  exports: [NavMenuComponent]
})
export class NavMenuModule {}