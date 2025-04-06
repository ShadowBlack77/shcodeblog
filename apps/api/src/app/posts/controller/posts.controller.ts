import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { PostsService } from '../repository/posts.service';
import { Public } from '../../common/public.decorator';
import { PostModel } from '../models/post.model';

@Controller('posts')
export class PostsController {

  constructor(private readonly _postsService: PostsService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('featured') featured: string,
    @Query('category') category: string,
    @Query('page') page: string,
    @Query('size') size: string
  ): Promise<PostModel[]> {
    return this._postsService.getAll(
      featured, 
      category, 
      page, 
      size
    );
  }

  @Public()
  @Get('/count')
  @HttpCode(HttpStatus.OK)
  count(): Promise<{ allPosts: number }> {
    return this._postsService.count();
  }

  @Post('/like/:id')
  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: {
      limit: 10,
      ttl: 60000
    }
  })
  @HttpCode(HttpStatus.OK)
  likeHandler(@Param('id') postId: string, @Res() res: Response) {
    return this._postsService.likeHandler(postId, res);
  }

  @Post('/save/:id')
  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: {
      limit: 10,
      ttl: 60000
    }
  })
  @HttpCode(HttpStatus.OK)
  saveHandler(@Param('id') postId: string, @Res() res: Response) {
    return this._postsService.saveHandler(postId, res);
  }

  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  get(@Param('id') id: string) {
    return this._postsService.get(id);
  }
}
