import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { AuthCredentionalInput } from './input/auth-credentional.input';
import { User } from './user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUser(id: string): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async signUp(authCredentionalInput: AuthCredentionalInput): Promise<User> {
    const { nickname, password } = authCredentionalInput;

    const salt = await bcrypt.genSalt();
    const user = this.userRepository.create({
      id: uuid(),
      nickname,
      salt: salt,
      password: await this.hashPassword(password, salt),
      registDate: new Date().toISOString(),
    });

    return this.userRepository.save(user);
  }

  async signIn(authCredentionalInput: AuthCredentionalInput): Promise<{accessToken: string}> {
    const nickname = await this.validateUserPassword(authCredentionalInput);

    if(nickname === null) {
      return null
    } else {
      const payload: JwtModule = { nickname };
      const accessToken = await this.jwtService.sign(payload);
      return {accessToken};
    }

  }

  async validateUserPassword(
    authCredentionalInput: AuthCredentionalInput,
  ): Promise<string> {
    const { nickname, password } = authCredentionalInput;
    const user = await this.userRepository.findOne({ nickname });

    if (user && (await user.validatePassword(password))) {
      return user.nickname;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
