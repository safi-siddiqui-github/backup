import { Injectable } from '@nestjs/common';
import { User } from '../../interfaces/user/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  createGeneralUser(user: User) {
    this.users.push(user);
    return user;
  }

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }
}
