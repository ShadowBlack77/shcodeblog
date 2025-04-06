import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { firebaseRefreshToken } from "../utils/firebase-refresh-token.utils";
import { Reflector } from "@nestjs/core";
import { AuthService } from "../repository/auth.service";
import { IS_PUBLIC_KEY } from "../../common/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly _authService: AuthService, private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (request.headers['api-key'] !== process.env.API_KEY) {
      return false;
    }

    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const { accessToken, refreshToken } = request.cookies;

    if (!accessToken) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decodedToken = await this._authService.verifyIdToken(accessToken);

      response.locals.user = {
        uid: decodedToken.uid,
      };
      
      return true;
    } catch (error) { 
      console.log(error);
      if (!refreshToken) {
        throw new UnauthorizedException('No token provided');
      }

      try {
        const newToken = await firebaseRefreshToken(response, refreshToken);

        const decodedToken = await this._authService.verifyIdToken(newToken);

        response.locals.user = {
          uid: decodedToken.uid,
          email: decodedToken.email,
          role: 'user'
        };

        return true;
      } catch (error) {
        console.log(error);
        
        return false;
      }
    }
  }
}