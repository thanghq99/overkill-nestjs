---
trigger: model_decision
description: Security and reliability protocols for external API integrations (Stripe, Twilio, AWS, etc.).
---

# External & Payment Integration Rules

## 🛡️ Zero-Trust Integration
- **Webhook Security**: All incoming webhooks (e.g., Stripe, GitHub) MUST verify their cryptographic signatures before processing. Reject any request with a missing or invalid signature.
- **Idempotency Keys**: For all outgoing, non-idempotent operations (POST pay, POST email, etc.), provide an idempotency key to prevent duplicate charges or messages during network retries.

## ⚡ Integration Resiliency
- **Circuit Breaker**: Use circuit breaker patterns for mission-critical external dependencies. If a third party like Stripe goes down, our core application should fail gracefully, not hang.
- **Timeout Monitoring**: Strictly define timeouts for all outgoing HTTP calls. Never let a hung external request block an internal worker or request thread.

## 📝 Logging & Privacy
- **Redaction Policy**: NEVER log sensitive integration data (e.g., Stripe API keys, customer card tokens, full webhook payloads) into standard app logs. Redact PII before logging.
- **Error Transparency**: Map external errors (e.g., Stripe 'declined') into professional, internal API error responses that guide the user without exposing internal integration details.
