---
trigger: model_decision
description: Security protocols including authentication, password hashing, session management, and rate limiting.
---

# Security & Compliance Rules

## 🔒 Authentication & Identity
- **Better-Auth Pattern**: Maintain total separation between `User` (identity) and `Account` (credentials/OAuth provider links). One `User` can have multiple `Accounts`.
- **Session Management**: Always implement database-backed `Session` entities for persistent login state to support remote logout and session revocation.

## 🔑 Hashing & Secrets
- **Argon2**: Mandatory for all password hashing operations unless specified otherwise by the library/framework (e.g., legacy migration).
- **Environment Safety**: Never commit secrets, API keys, or long-lived credentials to the Git repository. Always use AWS Secrets Manager or secure environment variables.

## 🛡️ Surface Defense
- **Rate Limiting**: Globally gated with `@nestjs/throttler`. All public endpoints and especially `/auth` endpoints MUST be rate-limited to avoid brute-force attacks.
- **Security Headers**: Always enable **Helmet** to set standardized security headers (XSS, HSTS, CSP).
- **Injection Prevention**: Use MikroORM parameters and avoid template literal concatenation in SQL queries. Use standard libraries for input sanitization where relevant.
