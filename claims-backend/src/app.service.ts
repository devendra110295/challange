import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): string {
    throw new NotFoundException('Invalid api Url');
  }
}
