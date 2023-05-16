import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { FoldersModule } from './folders/folders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
      },
      {
        rootPath: join(__dirname, '..', 'public/404'),
        renderPath: '404',
      },
    ),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UsersModule,
    UrlsModule,
    FoldersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
