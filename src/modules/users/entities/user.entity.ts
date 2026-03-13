import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @Property({ default: false })
  emailVerified: boolean;

  @Property({ nullable: true })
  image?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
