---
trigger: model_decision
description: Best practices for logging, metrics, health checks, and distributed tracing.
---

# Observability & Reliability Rules

## 📝 Structured Logging
- **Standardized Format**: Use structured JSON logging in production environments (e.g., `Pino`, `Winston`).
- **Contextual Awareness**: Every log SHOULD include trace IDs, correlation IDs, and common tags (environment, service_name).
- **Redaction**: Ensure PII (Passwords, Emails, Keys) is never logged into persistence layers.

## 📊 Metrics & Monitoring
- **Health Checks**: Always implement `/health` or `/status` endpoints that verify core system dependencies (Database, Redis, etc.) for infrastructure health checks.
- **Percentiles**: Monitor p50/p90/p95/p99 latency for critical API endpoints.

## ⚡ Error Handling & Debugging
- **Exception Filters**: Centralize all application-level errors into a global filter to ensure uniform error schema.
- **Jitter & Backoff**: Use exponential backoff with jitter for all internal and external retry logic.
- **Traceability**: Forward correlation IDs through all internal and external API calls (Microservices).
