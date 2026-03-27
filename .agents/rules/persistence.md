---
trigger: glob
description: Rules for database interactions, entity definitions, and MikroORM v7 usage.
globs:
  [
    'src/modules/**/entities/*.ts',
    'src/common/entities/*.ts',
    'mikro-orm.config.ts',
    '**/migrations/*.ts',
  ]
---

# Persistence & Data Integrity Rules

## 🧱 Entity Standards

- **Standardized Base**: All entities must spread `...baseProperties` from `src/common/entities/baseProperties` to handle `id`, `createdAt`, and `updatedAt` via hooks.
- **Soft Deletion**: Use `softDeleteFilter` from `src/common/entities/softDelete.filter` for all entities that require lifecycle support (e.g., User, Account).
- **Naming**: Use CamelCase for entity classes and property names. Use snake_case with project prefixes (if any) for database tables and columns.

## 🔒 Consistency & Transactions

- **Unit of Work**: In services, use transactional operations for all multi-persist multi-step processes. Explicitly use `em.flush()` or wraps in `em.transactional()` when data integrity across multiple tables is at stake.
- **Indexes**: Every foreign key and every `deletedAt` field must have an index to maintain query performance as the dataset grows.

## 🚀 Migrations & Governance

- **Forward-Only**: Never use `synchronize: true` or `drop: true` in production environments.
- **Controlled Changes**: All schema changes must be generated via `npx mikro-orm migration:create`, reviewed for performance impact (EXPLAIN), and committed to the repository.
