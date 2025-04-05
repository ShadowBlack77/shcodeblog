import { Component, inject, output, Signal } from "@angular/core";
import { Category } from "../../models/category/category.model";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { CategoryState, selectAllCategories } from "../../store/category/cateogry.state";

@Component({
  selector: 'lib-category-buttons',
  templateUrl: './category-buttons.component.html',
  standalone: false
})
export class CategoryButtonsComponent {

  private readonly _categoryStore: Store<CategoryState> = inject(Store);

  changeCategory = output<string>();

  allCategories$: Signal<Category[] | undefined> = toSignal(this._categoryStore.select(selectAllCategories));

  selectedCategory(category: string): void {
    this.changeCategory.emit(category);
  }
}