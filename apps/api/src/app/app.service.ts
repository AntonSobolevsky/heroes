import { Injectable } from '@nestjs/common';
import { Message } from '@heroes/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
