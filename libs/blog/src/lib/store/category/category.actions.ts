import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Category } from "../../models/category/category.model";

export const CategoryActions = createActionGroup({
  source: 'Category',
  events: {
    'fetch all categories': emptyProps(),
    'fetch all categories successfully': props<{ categories: Category[] }>(),
    'fetch all categories failure': props<{ error: string }>()
  }
});