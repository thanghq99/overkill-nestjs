import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'sessions' })
export class Session {
  @PrimaryKey()
  id: string;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  userId: string;

  @Property()
  @Unique()
  token: string;

  @Property()
  expiresAt: Date;

  @Property({ nullable: true })
  ipAddress?: string;

  @Property({ nullable: true })
  userAgent?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
