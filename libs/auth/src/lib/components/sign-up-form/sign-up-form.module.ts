import { NgModule } from "@angular/core";
import { SignUpFormComponent } from "./sign-up-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [SignUpFormComponent],
  exports: [SignUpFormComponent]
})
export class SignUpFormModule {}