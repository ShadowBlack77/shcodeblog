import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryActions } from "./category.actions";
import { catchError, map, of, switchMap, take } from "rxjs";
import { CategoryService } from "../../services/category/category.service";

@Injectable()
export class CategoryEffects {
  private readonly _actions$: Actions = inject(Actions);
  private readonly _categoryService: CategoryService = inject(CategoryService);

  fetchAllCategories$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(CategoryActions.fetchAllCategories),
      switchMap(() => {
        return this._categoryService.getAll().pipe(
          take(1),
          map((res) => {
            return CategoryActions.fetchAllCategoriesSuccessfully({ categories: res });
          }),
          catchError(() => {
            return of(CategoryActions.fetchAllCategoriesFailure({ error: 'Cannot fetch categories' }));
          })
        )
      })
    )
  })
}