import { createReducer, on } from "@ngrx/store";
import { CategoryActions } from "./category.actions";
import { CATEGORY_INIT_STATE } from "./cateogry.state";

export const CategoryReducer = createReducer(
  CATEGORY_INIT_STATE,
  on(CategoryActions.fetchAllCategoriesSuccessfully, (state, actions) => {
    return {
      ...state,
      categories: actions.categories
    }
  })
);