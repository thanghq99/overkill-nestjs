---
trigger: glob
description: Standards for automated testing, unit isolation, and E2E coverage.
globs:
  [
    'src/**/*.spec.ts',
    'src/**/*.test.ts',
    'test/**/*.e2e-spec.ts',
    'test/**/*.json',
  ]
---

# Automated Testing Standards

## 🧪 Unit Isolation
- **Mock External Deps**: Services and controllers MUST mock all external IO (database, Redis, Stripe, AWS) in unit tests. Ensure tests are 100% deterministic and execute in milliseconds.
- **Pure Function Focus**: Prioritize unit testing for logic-heavy utility functions.

## 🚀 E2E Workflow
- **Database Sanitization**: Use a dedicated, ephemeral database for E2E tests. Refresh or truncate data between each test file/suite to ensure isolation.
- **Dependency Isolation**: In E2E tests, mock all external service tiers (APIs, Email relays) to avoid side-effects and flaky network calls. Use deterministic stubs for non-local dependencies.

## 🧱 Coverage & Quality
- **Critical Path Coverage**: Mandate 100% coverage for the 'Golden Path' of payment, authentication, and core business transactions.
- **Regression Mindset**: Every fixed bug SHOULD have a corresponding regression test in the relevant suite to prevent its return.
