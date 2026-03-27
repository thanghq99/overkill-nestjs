import { p } from '@mikro-orm/core';

const baseProperties = {
  id: p.uuid().primary().defaultRaw(`gen_random_uuid()`),
  createdAt: p.datetime().onCreate(() => new Date()),
  updatedAt: p
    .datetime()
    .onCreate(() => new Date())
    .onUpdate(() => new Date()),
};

export default baseProperties;
