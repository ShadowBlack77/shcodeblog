import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from '../repository/auth.service';
import { Public } from '../../common/public.decorator';
import { SignInDto } from '../models/sign-in-dto.model';
import { SignUpDto } from '../models/sign-up-dto.model';

@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    return this._authService.signIn(res, signInDto);
  }

  @Public()
  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: {
      limit: 10,
      ttl: 60000
    }
  })
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Res() res: Response, @Body() signUpDto: SignUpDto) {
    return this._authService.signUp(res, signUpDto);
  }

  @Public()
  @Post('sign-in-with-google')
  @HttpCode(HttpStatus.OK)
  signInWithGoogle(@Res() res: Response, @Body() signInGoogleDto: any) {
    return this._authService.signInWithGoogle(res, signInGoogleDto);
  }

  @Public()
  @Post('sign-in-with-github')
  @HttpCode(HttpStatus.OK)
  signInWithGithub(@Res() res: Response, @Body() signInGithubDto: any) {
    return this._authService.signInWithGithub(res, signInGithubDto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  signOut(@Res() res: Response) {
    return this._authService.signOut(res);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@Res() res: Response) {
    return this._authService.profile(res);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Res() res: Response, @Body() resetPasswordDto: any) {
    return this._authService.resetPassword(res, resetPasswordDto);
  }
}
