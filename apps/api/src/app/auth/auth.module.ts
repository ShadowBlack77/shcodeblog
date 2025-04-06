import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./repository/auth.service";
import { UserService } from "../user/repository/user.service";
import { MailService } from "../mail/repository/mail.service";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    MailService
  ]
})
export class AuthModule {}