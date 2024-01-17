import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotFoundExceptionFilter } from './not-found.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    {
      ...HttpModule.register({}),
      global: true,
    },
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}
