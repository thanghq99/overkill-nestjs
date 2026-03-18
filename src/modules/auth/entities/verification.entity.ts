import { Entity, Property } from '@mikro-orm/core';

import { CustomBaseEntity } from '../../../common/entities/CustomBaseEntity';

@Entity({ tableName: 'verifications' })
export class Verification extends CustomBaseEntity {
  @Property()
  identifier: string;

  @Property()
  value: string;

  @Property()
  expiresAt: Date;
}
