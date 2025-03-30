import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UserService],
})
export class PostsModule {}
