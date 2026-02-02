# QuickNote — Backend

A secure and minimal **REST API** for a note-taking application, built with **Node.js + TypeScript + Express**.  
Designed with validation, security, and clarity in mind.

---

## 🚀 Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma ORM**
- **SQLite**
- **JWT (cookie-based auth)**
- **class-validator**
- **Helmet**
- **Express Rate Limit**
- **Swagger (OpenAPI)**

---

**Design principle:**

> Thin controllers, explicit middleware, predictable request lifecycle.

---

## 🔐 Authentication

- **JWT stored in HttpOnly cookies**
- Access token validated via middleware
- Notes are strictly **user-scoped**
- Ownership enforced on update/delete

> Refresh token logic is intentionally minimal and can be extended.

---

## 📄 API Documentation (Swagger)

Available at:

http://localhost:3000/docs

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=file:./dev.db
ALLOWED_ORIGINS=
JWT_SECRET=
JWT_REFRESH_SECRET=
SALT_ROUND=10
COOKIE_MAX_AGE=900000
COOKIE_LONG_MAX_AGE=604800000
```

## Development

```bash
pnpm install
pnpm prisma migrate dev
pnpm dev
```

### Server runs on:

http://localhost:3000

### Database:

Prisma ORM

SQLite database

### Schema includes:

User

Note

### Security Measures:

helmet for HTTP hardening

Rate limiting on API

CORS allowlist

Request body validation

HttpOnly cookies

x-powered-by disabled

## 📌 Known Limitations / Future Work

Refresh token rotation not fully implemented.

No RBAC (single-user role).

No automated tests yet.

SQLite should be replaced with PostgreSQL in production.

## 🔗 Related Repository

Frontend client:
https://github.com/mssoheil/quickNote-frontend
