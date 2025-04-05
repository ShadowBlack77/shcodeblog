import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../store/category/cateogry.state';
import { CategoryActions } from '../../store/category/category.actions';

export const categoryResolver: ResolveFn<boolean> = () => {

  const _categoryStore: Store<CategoryState> = inject(Store);

  _categoryStore.dispatch(CategoryActions.fetchAllCategories());

  return true;
};
