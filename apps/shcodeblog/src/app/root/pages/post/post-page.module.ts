import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostPageComponent } from "./post-page.component";
import { SelectedPostModule } from "@shcodeblog/blog";
import { UserPostButtonActionsModule } from "@shcodeblog/auth";

const routes: Routes = [
  {
    path: '',
    component: PostPageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SelectedPostModule,
    UserPostButtonActionsModule
  ],
  declarations: [PostPageComponent],
})
export class PostPageModule {}