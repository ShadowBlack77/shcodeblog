import { NgModule } from "@angular/core";
import { ResetPasswordFormComponent } from "./reset-password-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [ResetPasswordFormComponent],
  exports: [ResetPasswordFormComponent]
})
export class ResetPasswordFormModule {}