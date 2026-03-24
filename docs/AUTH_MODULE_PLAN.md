# Auth Module Implementation Plan (Better-Auth Inspired)

## Overview
This document outlines the design and implementation strategy for the Authentication module, inspired by [Better-Auth](https://better-auth.com). The goal is to build a robust, secure, and multi-provider capable authentication system from scratch for learning purposes.

### Core Concepts
- **Multi-Account Support**: Decoupling `User` from `Account` to allow multiple login methods (Email/Password, Google, etc.) for a single user identity.
- **Database-Backed Sessions**: Using a `Session` entity for persistent login state, allowing for session revocation and multi-device management.
- **Security-First**: Using `argon2` for password hashing and transactional operations for data integrity.

---

## 📚 References
- **Better-Auth LLM Specs**: [https://better-auth.com/llms.txt](https://better-auth.com/llms.txt)
- **Framework**: NestJS (Node 24)
- **ORM**: MikroORM (PostgreSql)
- **Hashing**: Argon2

---

## 🏛️ Architecture & Schema Mapping

### 1. User Entity (The Profile)
- `id`: UUID (Primary Key)
- `name`, `email`, `emailVerified`, `image`
- `deletedAt`: Date (Soft Delete)

### 2. Account Entity (The Credentials/Connection)
- `user`: ManyToOne to `User` (property name)
- `accountId`: string (Link ID - e.g., email or OAuth provider unique ID)
- `providerId`: string (e.g., 'credentials', 'google', 'github')
- `password`: string (Hashed - Optional for OAuth)
- `accessToken`/`refreshToken`: (For OAuth)

### 3. Session Entity (Active Login)
- `user`: ManyToOne to `User` (property name)
- `token`: Unique Session Token
- `expiresAt`: Date
- `ipAddress`/`userAgent`: Metadata

---

## 🚀 Implementation Roadmap & Progress Tracker

| Status | Phase | Task | Description |
| :--- | :--- | :--- | :--- |
| ✅ | **Prep** | **Node 24 Setup** | Ensure environment uses Node 24 stable. |
| ✅ | **Prep** | **Base Entities** | Define User, Account, Session, and Verification entities. |
| ✅ | **Core** | **Security Utils** | Implement `argon2` hashing and verification in `auth/utils.ts`. |
| ✅ | **Core** | **Transactional SignUp** | Update `register` to create both `User` and `Account` in one `flush()`. |
| ⏳ | **Core** | **Session & SignIn** | Implement credential verification and persistent session issuance. |
| ⬜ | **Core** | **Auth Guards** | `SessionGuard` / `@UseGuards()` logic to protect private routes. |
| ⬜ | **Extension**| **Social Login (OAuth)** | Integrate GitHub/Google OAuth providers. |
| ⬜ | **Extension**| **Magic Link** | Implementation of passwordless email login (No-Password flow). |
| ⬜ | **Security** | **Two-Factor (2FA)** | Add SMS or App OTP as a second layer of security. |
| ⬜ | **Elite** | **Passkeys (WebAuthn)** | Biometric login (FaceID/Fingerprint) support. |

---

## 💡 Future-Proofing (Advanced Features)

### Account Linking Strategy
- If a user registers with an existing email via a new provider, link it to the existing `User` after verification.
- **Security**: Never link an unverified account automatically.

### Session Revocation
- Enable users to see active sessions and log out of other devices (Remote Logout).
