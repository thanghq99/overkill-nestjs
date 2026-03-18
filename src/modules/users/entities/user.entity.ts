import { Entity, Index, Property } from '@mikro-orm/core';

import { CustomBaseEntity } from '../../../common/entities/CustomBaseEntity';
import { SoftDelete } from '../../../common/entities/SoftDelete.filter';

@Entity({ tableName: 'users' })
@SoftDelete()
export class User extends CustomBaseEntity {
  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @Property({ default: false })
  emailVerified?: boolean = false;

  @Property({ nullable: true })
  image?: string;

  @Index()
  @Property({ nullable: true })
  deletedAt?: Date;
}
