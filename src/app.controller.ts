import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';
import { validate as isValidUUID } from 'uuid';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/users')
  findAll() {
    return this.appService.findAll();
  }

  @Get('/users/:id')
  findOne(@Param('id') id: string) {
    if(!isValidUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.appService.findOne(id);
  }

  @Post('/users')
  @UsePipes(ValidationPipe)
  create(@Body() item: UserDto) {
    return this.appService.create(item);
  }

  @Put('/users/:id')
  update(@Param('id') id: string, @Body() item: any) {
    if(!isValidUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.appService.update(id, item);
  }

  @Delete('/users/:id')
  delete(@Param('id') id: string) {
    if(!isValidUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    return this.appService.delete(id);
  }
}
