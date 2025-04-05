import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ENV_CONFIG, EnvConfig } from "@shcodeblog/core/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(ENV_CONFIG) private readonly _env: EnvConfig) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const headers = req.headers.set('api-key', this._env.apiKey);

    const clonedRequest = req.clone({ headers });

    return next.handle(clonedRequest);
  }
}