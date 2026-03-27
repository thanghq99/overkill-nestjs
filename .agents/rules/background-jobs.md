---
trigger: glob
description: Rules for asynchronous background processes, worker tasks, and job queuing.
globs:
  [
    'src/modules/**/processors/*.ts',
    'src/modules/**/jobs/*.ts',
    'src/modules/**/*.processor.ts',
  ]
---

# Background & Async Processing Rules

## ⚡ Atomicity & State
- **Idempotency First**: All background jobs MUST be idempotent. Re-running a job (e.g., due to a crash) should never result in a duplicate side-effect (like charging a user twice).
- **Small Context**: Jobs should only pass minimum necessary data (usually an ID). Fetch the fresh state from the database inside the processor to avoid processing stale data.

## 🔄 Resilience & Failure
- **Retry Strategy**: All background tasks must have a defined retry policy with exponential backoff and jitter. Default to at least 3-5 retries for transient external failures.
- **DLQ (Dead Letter Queue)**: Failed jobs that exceed retry limits MUST be moved to a DLQ for manual inspection. Never let failing jobs silently disappear.

## 🚀 Performance
- **Concurrency Control**: Define concurrency limits for CPU or IO-intensive processors to prevent resource starvation on the main API.
