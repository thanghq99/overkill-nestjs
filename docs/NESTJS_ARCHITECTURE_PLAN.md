# NestJS Professional Foundation Plan & Architecture Decisions

This document outlines the foundational setup and architectural decisions for a professional-grade NestJS project.

## 1. Project Initialization & Tooling

- **Framework**: NestJS (v11)
- **Node Version**: 24 (LTS)
- **Package Manager**: `npm`
- **CLI**: `@nestjs/cli` for scaffolding
- **Linting/Formatting**: ESLint + Prettier

## 2. Standardized Folder Structure

Follow a module-based architecture:

```text
src/
├── common/             # Global decorators, filters, guards, interceptors, pipes
├── config/             # Configuration modules and Zod validation schemas
├── database/           # TypeORM/Prisma migrations and seeders
├── modules/            # Business logic (Domain)
│   ├── auth/           # Authentication & Authorization
│   ├── users/          # User Management
│   └── ...
├── app.module.ts       # Root module
└── main.ts             # Entry point
```

## 3. Core Technical Pillars

### A. Configuration (Security & Type Safety)

- Use `@nestjs/config`.
- **Validation**: Environment variables must be validated at startup using **Zod**.

### B. Database & Persistence

- **Engine**: PostgreSQL.
- **ORM**: TypeORM (Traditional) or Prisma (Modern DX).
- **Migrations**: Always use migrations. Never use `synchronize: true` in production.

### C. Validation & Transformation

- Use `class-validator` + `class-transformer` for Request DTOs.
- Global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true`.

### D. Global Exception Handling

- Custom `AllExceptionsFilter` to standardize error responses (Status Code, Timestamp, Path, Message).

### E. Security Defaults

- **Helmet**: Set security headers.
- **CORS**: Strictly defined.
- **Rate Limiting**: `@nestjs/throttler`.
- **Auth**: JWT based with Passport.js.

## 4. Architectural Decision Log (ADL)

### Decision: Using Zod (Config) + Class-Validator (DTOs)

#### Context

Whether to use a single validation library or a combination for different parts of the system.

#### Decision

We use **Zod** for Environment Variables and **Class-Validator** for Request DTOs.

#### Rationale

- **Zod for Config**:
  - **Functional & Lightweight**: Ideal for plain objects like `process.env`.
  - **Type Inference**: Automatically generates TypeScript types without manual interfaces.
  - **Fail-fast**: Perfect for startup-time validation.
- **Class-Validator for DTOs**:
  - **NestJS Integration**: Native support via `ValidationPipe`.
  - **Swagger Support**: Automatically generates OpenAPI documentation via decorators.
  - **OOP Friendly**: Matches the decorator-heavy style of NestJS.

#### Trade-offs of "Class-Validator Only"

While possible to use `class-validator` for everything, it requires manual object instantiation (`plainToInstance`) for env variables and lacks the elegant type inference that Zod provides for static configurations.

## 5. Learning Roadmap

1. **Phase 1**: Initial scaffold & Zod Config.
2. **Phase 2**: Database connection & User Entity.
3. **Phase 3**: Authentication (Signup/Login/JWT).
4. **Phase 4**: CRUD operations with DTOs and Logic.
5. **Phase 5**: Global Filters, Logging, and Swagger.
6. **Phase 6**: Containerization (Docker) and CI/CD (GitHub Actions).

---

_Created by Antigravity AI - Senior Principal Engineer Standard_
