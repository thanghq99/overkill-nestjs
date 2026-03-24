import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';

import { CustomBaseEntity } from '../../../common/entities/CustomBaseEntity';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'sessions' })
export class Session extends CustomBaseEntity {
  @ManyToOne(() => User, { deleteRule: 'cascade' })
  user: User;

  @Property()
  @Unique()
  token: string;

  @Property()
  expiresAt: Date;

  @Property({ nullable: true })
  ipAddress?: string;

  @Property({ nullable: true })
  userAgent?: string;
}
