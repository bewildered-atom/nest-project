import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configurations from './config/configurations';
import { DatabaseModule } from './database/database.module';
import { AWSModule } from './aws/aws.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    UsersModule,
    AWSModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public')
    }),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
