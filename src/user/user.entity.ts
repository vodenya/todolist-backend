import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/task/task.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity("users")
@ObjectType()
@Unique(['nickname'])
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  nickname: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  salt: string;

  @Field()
  @Column()
  registDate: string;

  @Field()
  accessToken: string;

  @Field(() => [Task])
  @OneToMany((type) => Task, (task) => task.user, {eager: false})
  @JoinColumn()
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}