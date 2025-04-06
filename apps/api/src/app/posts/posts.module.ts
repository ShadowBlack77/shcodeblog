import { Module } from '@nestjs/common';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './repository/posts.service';
import { UserService } from '../user/repository/user.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UserService],
})
export class PostsModule {}
