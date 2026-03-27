import { defineEntity, p } from '@mikro-orm/core';
import baseProperties from 'src/common/entities/baseProperties';
import { softDeleteFilter } from 'src/common/entities/softDelete.filter';
import { User } from 'src/modules/users/entities/user.entity';

export const AccountSchema = defineEntity({
  name: 'Account',
  tableName: 'accounts',
  uniques: [
    {
      name: 'accounts_provider_id_account_id_unique',
      properties: ['providerId', 'accountId'],
    },
    {
      name: 'accounts_user_id_provider_id_unique',
      properties: ['user', 'providerId'],
    },
  ],
  properties: {
    ...baseProperties,
    user: () =>
      p.manyToOne(User).ref().updateRule('cascade').deleteRule('cascade'),
    accountId: p.string(),
    providerId: p.string(),
    accessToken: p.text().nullable(),
    refreshToken: p.text().nullable(),
    accessTokenExpiresAt: p.datetime().nullable(),
    refreshTokenExpiresAt: p.datetime().nullable(),
    scope: p.string().nullable(),
    idToken: p.text().nullable(),
    password: p.text().nullable(),
    deletedAt: p.datetime().nullable().index('accounts_deleted_at_index'),
  },
  filters: { softDelete: softDeleteFilter() },
});

export class Account extends AccountSchema.class {}
AccountSchema.setClass(Account);
