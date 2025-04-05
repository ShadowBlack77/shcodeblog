import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./user-profile.component";

@NgModule({
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent]
})
export class UserProfileModule {}