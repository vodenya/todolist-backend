import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('tasks')
@ObjectType()
export class Task extends BaseEntity {
  @Field((type) => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  todo: string;

  @Field()
  @Column()
  checked: boolean;

  @Field()
  @Column()
  order: number;

  @Field()
  @Column()
  addDate: string;

  @ManyToOne(() => User, (user) => user.tasks, {eager: true})
  @JoinColumn()
  user: User;

  @Column()
  userId: number;
}
