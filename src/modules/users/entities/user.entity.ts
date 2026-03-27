import { defineEntity, p } from '@mikro-orm/core';
import baseProperties from 'src/common/entities/baseProperties';
import { softDeleteFilter } from 'src/common/entities/softDelete.filter';
import { Account } from 'src/modules/auth/entities/account.entity';
import { Session } from 'src/modules/auth/entities/session.entity';

export const UserSchema = defineEntity({
  name: 'User',
  tableName: 'users',
  properties: {
    ...baseProperties,
    name: p.string(),
    email: p.string().unique('users_email_unique'),
    emailVerified: p.boolean().default(false),
    image: p.string().nullable(),
    deletedAt: p.datetime().nullable().index('users_deleted_at_index'),
    accounts: () => p.oneToMany(Account).mappedBy('user'),
    sessions: () => p.oneToMany(Session).mappedBy('user'),
  },
  filters: { softDelete: softDeleteFilter() },
});
export class User extends UserSchema.class {}
UserSchema.setClass(User);
