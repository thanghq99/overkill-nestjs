import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'verifications' })
export class Verification {
  @PrimaryKey()
  id: string;

  @Property()
  identifier: string;

  @Property()
  value: string;

  @Property()
  expiresAt: Date;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
