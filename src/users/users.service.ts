import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  private readonly filePath = path.resolve(process.cwd(), 'src', 'users.json');

  getAllUsers() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new InternalServerErrorException('Could not load user data');
    }
  }

  getUserById(id: number) {
    const users = this.getAllUsers();
    return users.find((user) => user.id === id);
  }
}
