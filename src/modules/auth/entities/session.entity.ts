import { defineEntity, p } from '@mikro-orm/core';
import baseProperties from 'src/common/entities/baseProperties';
import { User } from 'src/modules/users/entities/user.entity';

export const SessionSchema = defineEntity({
  name: 'Session',
  tableName: 'sessions',
  properties: {
    ...baseProperties,
    user: () =>
      p.manyToOne(User).ref().updateRule('cascade').deleteRule('cascade'),
    token: p.string().unique('sessions_token_unique'),
    expiresAt: p.datetime(),
    ipAddress: p.string().nullable(),
    userAgent: p.string().nullable(),
  },
});

export class Session extends SessionSchema.class {}
SessionSchema.setClass(Session);
