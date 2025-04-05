import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../models/user.model";

export interface AuthState {
  readonly user: User | undefined;
  readonly message: string | null;
  readonly error: string | null;
}

export const AUTH_INIT_AUTH_STATE: AuthState = {
  user: undefined,
  message: null,
  error: null
};

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectMessage = createSelector(selectAuthState, (state) => state.message);
export const selectError = createSelector(selectAuthState, (state) => state.error);