import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    MailService
  ]
})
export class AuthModule {}
