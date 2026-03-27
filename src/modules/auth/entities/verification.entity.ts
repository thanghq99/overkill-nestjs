import { defineEntity, p } from '@mikro-orm/core';
import baseProperties from 'src/common/entities/baseProperties';

export const VerificationSchema = defineEntity({
  name: 'Verification',
  tableName: 'verifications',
  properties: {
    ...baseProperties,
    identifier: p.string(),
    value: p.string(),
    expiresAt: p.datetime(),
  },
});

export class Verification extends VerificationSchema.class {}
VerificationSchema.setClass(Verification);
