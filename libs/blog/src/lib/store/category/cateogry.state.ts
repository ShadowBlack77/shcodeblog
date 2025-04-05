import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Category } from "../../models/category/category.model";

export interface CategoryState {
  categories: Category[];
}

export const CATEGORY_INIT_STATE: CategoryState = {
  categories: []
}

const selectCategoryState = createFeatureSelector<CategoryState>('category');

export const selectAllCategories = createSelector(selectCategoryState, (state: CategoryState) => {
  return state.categories;
});