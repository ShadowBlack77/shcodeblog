import { NgModule } from "@angular/core";
import { SignInFormComponent } from "./sign-in-form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [SignInFormComponent],
  exports: [SignInFormComponent]
})
export class SignInFormModule {}