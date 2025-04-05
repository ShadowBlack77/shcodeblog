import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { RouterModule, Routes } from "@angular/router";
import { CategoryButtonsModule, FeaturedSectionModule, PostFeaturedListSectionModule, PostListSectionModule } from '@shcodeblog/blog';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
]

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PostListSectionModule,
    PostFeaturedListSectionModule,
    FeaturedSectionModule,
    CategoryButtonsModule
  ]
})
export class HomePageModule {}