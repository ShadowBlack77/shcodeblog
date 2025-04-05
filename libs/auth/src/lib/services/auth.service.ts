import { HttpClient } from "@angular/common/http";
import { Inject, inject, Injectable } from "@angular/core";
import { from, Observable, switchMap } from "rxjs";
import { User } from "../models/user.model";
import { ENV_CONFIG, EnvConfig } from '@shcodeblog/core/environment';
import { SignInDto } from "../models/sign-in-dto.model";
import { SignUpDto } from "../models/sign-up-dto.model";
import { Auth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _auth: Auth = inject(Auth);

  constructor(@Inject(ENV_CONFIG) private readonly _env: EnvConfig) {}

  signIn(signInDto: SignInDto): Observable<unknown> {
    return this._httpClient.post<unknown>(`${this._env.apiUrl}/auth/sign-in`, { email: signInDto.email, password: signInDto.password }, { withCredentials: true });
  }

  signUp(signUpDto: SignUpDto): Observable<unknown> {
    return this._httpClient.post<unknown>(`${this._env.apiUrl}/auth/sign-up`, { username: signUpDto.username, email: signUpDto.email, password: signUpDto.password });
  }

  signInGoogle(): Observable<unknown> {
    const provider = new GoogleAuthProvider();

    return from(signInWithPopup(this._auth, provider)).pipe(
      switchMap((res) => {
        return this._httpClient.post(`${this._env.apiUrl}/auth/sign-in-with-google`, res, { withCredentials: true });
      })
    );
  }

  signInGithub(): Observable<unknown> {
    const provider = new GithubAuthProvider();

    return from(signInWithPopup(this._auth, provider)).pipe(
      switchMap((res) => {
        return this._httpClient.post(`${this._env.apiUrl}/auth/sign-in-with-github`, res, { withCredentials: true });
      })
    );
  }

  signOut(): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/sign-out`, { content: 'logged out' }, { withCredentials: true });
  }

  profile(): Observable<User> {
    return this._httpClient.get<User>(`${this._env.apiUrl}/auth/profile`, { withCredentials: true });
  }

  resetPassword(email: string): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/auth/reset-password`, { email: email });
  }
}