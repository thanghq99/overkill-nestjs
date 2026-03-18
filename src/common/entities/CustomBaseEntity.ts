import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class CustomBaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
