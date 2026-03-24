import { Entity, Index, ManyToOne, Property, Unique } from '@mikro-orm/core';

import { CustomBaseEntity } from '../../../common/entities/CustomBaseEntity';
import { SoftDelete } from '../../../common/entities/SoftDelete.filter';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'accounts' })
@Unique({ properties: ['providerId', 'accountId'] })
@Unique({ properties: ['user', 'providerId'] })
@SoftDelete()
export class Account extends CustomBaseEntity {
  @ManyToOne(() => User, { deleteRule: 'cascade' })
  user: User;

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

  @Index()
  @Property({ nullable: true })
  deletedAt?: Date;
}
