import { Module } from "@nestjs/common";
import { UserService } from "./repository/user.service";

@Module({
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}