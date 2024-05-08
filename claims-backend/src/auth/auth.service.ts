import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'password',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  validateUser({ username, password }: AuthPayloadDto) {
    const user = fakeUsers.find((user) => user.username === username);
    if (!user) return null;
    if (password === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...signedUser } = user;
      return this.jwtService.sign(signedUser);
    }
  }
}
