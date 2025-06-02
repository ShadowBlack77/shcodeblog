import { Module, ValidationPipe } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CategoryModule } from './category/category.module';
import { AuthService } from './auth/repository/auth.service';
import { MailService } from './mail/repository/mail.service';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60
    }]),
    ConfigModule.forRoot({
      envFilePath: join(__dirname, 'assets/.env'),
      isGlobal: true
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: join(__dirname, `assets/secrets/${process.env.FIREBASE_CONFIG_FILE}`)
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../shcodeblog/browser'),
    }),
    AuthModule,
    UserModule,
    PostsModule,
    CategoryModule,
    MailModule,
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
