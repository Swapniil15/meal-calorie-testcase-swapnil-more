
# 🧪 API Test Cases – Playwright

This project uses **Playwright** for automated API testing of backend routes like authentication, calorie lookup, and feedback submission.

---

## 📦 Prerequisites

Make sure the backend server is running at:

```
http://localhost:8000
```

Install Playwright:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

Create a `.env` file in the root:

```
BASE_URL=http://localhost:8000
PASSWORD=secure123
```

---

## 🧾 Test File

All test cases are in:

```
tests/api.spec.js
```

Covers user registration, login, calorie count retrieval, feedback, and authorization.

---

## ▶️ Run Tests

Run all tests:

```bash
npx playwright test
```

Run with headed mode (UI):

```bash
npx playwright test tests/example.spec.js --headed
```

---

## ✅ Covered Test Cases

| Test Description                       | Method | Endpoint           |
|----------------------------------------|--------|--------------------|
| ✅ Register a new user                  | POST   | /auth/register     |
| ✅ Register with duplicate email        | POST   | /auth/register     |
| ✅ Login user & get token               | POST   | /auth/login        |
| ✅ Invalid login – wrong password       | POST   | /auth/login        |
| ✅ Invalid login – wrong email format   | POST   | /auth/login        |
| ✅ Get calories for valid dish          | POST   | /get-calories      |
| ✅ Get calories – invalid dish name     | POST   | /get-calories      |
| ✅ Reject zero servings                 | POST   | /get-calories      |
| ✅ Reject negative servings             | POST   | /get-calories      |
| ✅ Submit feedback for dish             | POST   | /submit-feedback   |
| ✅ Reject calorie fetch without token   | POST   | /get-calories      |
| ✅ Reject feedback submit without token | POST   | /submit-feedback   |
| ✅ Data-driven calorie tests (multiple) | POST   | /get-calories      |

---

## 🛠️ Config Notes

- Change `BASE_URL` in `.env` to match your backend.
- Use dynamic emails in tests (`user${Date.now()}`) to avoid registration conflicts.
- Protected routes require Bearer token in headers.
- Data-driven testing added using `forEach` and `describe` blocks.

---

