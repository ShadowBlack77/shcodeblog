import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { FirebaseModule } from 'nestjs-firebase';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { MailService } from './mail/mail.service';
import { AuthService } from './auth/auth.service';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60
    }]),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: join(__dirname, '../config/shcode-blog-firebase-adminsdk-fbsvc-c3dcd90665.json')
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend-dist', 'frontend', 'browser'),
    }),
    AuthModule,
    MailModule,
    UserModule,
    PostsModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [
    AuthService,
    MailService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    }
  ],
})
export class AppModule {}
