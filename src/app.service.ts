import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private items = [];

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    console.log("id", id)
    console.log("items", this.items)
    let data = this.items.find(item => item.id === id);
    if(data) {
      return data
    } else {
      throw new HttpException("userId doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  create(item: UserDto) {
    item['id'] = uuidv4();
    console.log("item", item)
    this.items.push(item);
    return { message: 'Item created successfully' };
  }

  update(id: string, updatedFields: any) {
    let data;
    let updatedData = this.items.map(item => {
      if (item.id === id) {
        data = { ...item, ...updatedFields };
      } 
    });

    if(data) {
      return data
    } else {
      throw new HttpException("userId doesn't exist", HttpStatus.NOT_FOUND);
    }
    
  }

  delete(id: string) {
    let data;
    let updatedItems = this.items.filter((item) => {
      if(item.id !== id) {
        data = item
        return item
      }
    });

    console.log("updatedItems", updatedItems)
    if(data) {
      return { statusCode: HttpStatus.NO_CONTENT, message: 'Item deleted successfully' };
    } else {
      throw new HttpException("userId doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
