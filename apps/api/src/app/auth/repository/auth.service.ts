import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { Response } from 'express';
import { SignInDto } from '../models/sign-in-dto.model';
import { firebaseLogin } from '../utils/firebase-login.utils';
import { setAccessTokenCookie } from '../utils/set-access-token-cookie.utils';
import { setRefreshTokenCookie } from '../utils/set-refresh-token-cookie.utils';
import { SignUpDto } from '../models/sign-up-dto.model';
import { SignInAuthDto } from '../models/sign-in-oauth-dto.model';
import { ResetPasswordDto } from '../models/reset-password-dto.model';
import { UserService } from '../../user/repository/user.service';
import { MailService } from '../../mail/repository/mail.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin, 
    private readonly _userService: UserService,
    private readonly _mailService: MailService
  ) {}

  async signIn(res: Response, SignInDto: SignInDto) {
    try {
      const signInPayload = await firebaseLogin(SignInDto);

      setAccessTokenCookie(res, signInPayload.idToken);
      setRefreshTokenCookie(res, signInPayload.refreshToken);

      return res.status(200).json({ content: 'logged in' });
    } catch (error) {
      console.log(error);
      
      return res.status(401).json({ message: 'Invalid Credentials' })
    }
  }

  async signOut(res: Response) {

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.status(200).json({ content: 'logged out' });
  }

  async signUp(res: Response, signUpDto: SignUpDto) {
    try {
      const newUser = await this._firebase.auth.createUser({
        email: signUpDto.email,
        password: signUpDto.password,
      });

      await this._userService.createUserDoc(
        newUser.uid,
        signUpDto.username,
        signUpDto.email,
        'user',
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        false
      );

      return res.status(201).json({ content: 'Created' });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signInWithGoogle(res: Response, signInGoogleDto: SignInAuthDto) {
    try {
      const { uid, displayName, email, emailVerified, photoURL, stsTokenManager } = signInGoogleDto.user;

      await this._userService.createUserDoc(
        uid,
        displayName,
        email,
        'user',
        photoURL,
        emailVerified
      );
  
      setAccessTokenCookie(res, stsTokenManager.accessToken);
      setRefreshTokenCookie(res, stsTokenManager.refreshToken);
  
      return res.status(200).json({ content: 'Logged In' });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signInWithGithub(res: Response, signInGithubDto: SignInAuthDto) {
    try {
      const { uid, displayName, email, emailVerified, photoURL, stsTokenManager } = signInGithubDto.user;

      await this._userService.createUserDoc(
        uid,
        displayName,
        email,
        'user',
        photoURL,
        emailVerified
      );

      setAccessTokenCookie(res, stsTokenManager.accessToken);
      setRefreshTokenCookie(res, stsTokenManager.refreshToken);
  
      return res.status(200).json({ content: 'Logged In' });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyIdToken(accessToken: string) {
    const decodedToken = await this._firebase.auth.verifyIdToken(accessToken);

    return decodedToken;
  }

  async profile(res: Response) {
    try {
      const userId = res.locals.user.uid;

      const user = await this._userService.getUser(userId);

      return res.status(200).json(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async resetPassword(res: Response, resetPasswordDto: ResetPasswordDto) {
    try {
      const { email } = resetPasswordDto;

      const resetLink = await this._firebase.auth.generatePasswordResetLink(email);

      const response = await this._mailService.sendMail(email, 'Zresetuj haslo', resetLink);

      return res.status(200).json(response);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
