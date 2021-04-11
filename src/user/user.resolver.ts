import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthCredentionalInput } from './input/auth-credentional.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async user(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  @Query((returns) => [User])
  async users() {
    return this.userService.getUsers();
  }

  @Mutation((returns) => User)
  async signUp(
    @Args('authCredentionalInput') authCredentionalInput: AuthCredentionalInput,
  ) {
    return this.userService.signUp(authCredentionalInput);
  }

  @Mutation((returns) => User)
  async signIn(
    @Args('authCredentionalInput') authCredentionalInput: AuthCredentionalInput,
  ): Promise<{accessToken: string}> {
    return await this.userService.signIn(authCredentionalInput);
  }
}
