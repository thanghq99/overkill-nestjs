---
trigger: model_decision
description: Standard practices for API design: naming conventions, response structures, versioning, and DTO validation.
---

# Professional API Design Standards

## 🎯 Interface & Responses
- **RESTful Resource Matching**: Map API endpoints to domain resources (e.g., `/users`, `/accounts`). Use plural names for resources.
- **Unified Response Structure**: Return standardized JSON objects with a consistent shape (e.g., `data`, `meta`, `status`). 
- **Error Consistency**: Use **`AllExceptionsFilter`** or equivalent to ensure all errors return the same schema (Status Code, Timestamp, Path, Message).

## 🚀 Versioning & Pagination
- **Versioning**: Always prefix API endpoints with a version (e.g., `/api/v1/...`). Avoid non-versioned endpoints for breaking production changes.
- **Pagination**: Implement cursor-based or offset-based pagination for all collection-returning endpoints. Never return a full unbounded list of resources.

## 🛡️ Validation & DTOs
- **Input Control**: Use Request DTOs for all POST, PATCH, and PUT methods. 
- **Schema Validation**: Use **`class-validator`** with **`class-transformer`** via the global `ValidationPipe` for automatic transformation and validation.
- **Strict Mode**: Enable `whitelist: true` and `forbidNonWhitelisted: true` to prevent data over-posting.
- **Config Type Safety**: Use **Zod** for Environment Variable validation at startup (fail-fast).

## 📄 Documentation (OpenAPI/Swagger)
- **Auto-Generation**: Use `@nestjs/swagger` decorators on all controllers and DTOs to maintain up-to-date OpenAPI documentation.
- **Descriptions**: Add clear descriptions, example values, and correct status codes to all Swagger-decorated methods.
