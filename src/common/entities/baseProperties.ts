import { p } from '@mikro-orm/core';

const baseProperties = {
  id: p
    .uuid()
    .primary()
    .onCreate(() => crypto.randomUUID()),
  createdAt: p.datetime().onCreate(() => new Date()),
  updatedAt: p
    .datetime()
    .onCreate(() => new Date())
    .onUpdate(() => new Date()),
};

export default baseProperties;
