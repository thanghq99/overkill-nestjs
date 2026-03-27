---
trigger: always_on
description: Core project standards and architectural foundations.
---

# Core Standards

## 🏗️ Architectural Blueprint

- **Framework**: Standardize on NestJS (v11) using a module-based architecture.
- **Folder Structure**:
  - `src/common/`: Shared utilities, global filters/guards.
  - `src/modules/`: Feature-scoped domains (Users, Auth, etc.).
  - `src/config/`: Runtime configuration management.
- **Runtime**: **Node 24 (LTS)** is mandatory. Always verify node version (`nvm use 24`) before running builds or installs.

## 🛠️ Tooling & DX

- **Version Control**: Atomic commits with descriptive messages.
- **Dependency Management**: Use `npm`. Prefer specific versions or strict pinning for critical production dependencies.
- **Linting**: Follow the local ESLint and Prettier configurations strictly.
