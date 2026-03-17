import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'accounts' })
@Unique({ properties: ['providerId', 'accountId'] })
export class Account {
  @PrimaryKey()
  id: string;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  userId: string;

  @Property()
  accountId: string;

  @Property()
  providerId: string;

  @Property({ nullable: true, type: 'text' })
  accessToken?: string;

  @Property({ nullable: true, type: 'text' })
  refreshToken?: string;

  @Property({ nullable: true })
  accessTokenExpiresAt?: Date;

  @Property({ nullable: true })
  refreshTokenExpiresAt?: Date;

  @Property({ nullable: true })
  scope?: string;

  @Property({ nullable: true, type: 'text' })
  idToken?: string;

  @Property({ nullable: true, type: 'text' })
  password?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
