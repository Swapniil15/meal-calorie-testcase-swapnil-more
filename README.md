
## 🧪 API Test Cases (Playwright)

This project uses **Playwright** for automated API testing of backend routes like authentication, calorie lookup, and feedback submission.

---

### 📦 Prerequisites

Ensure you have the backend server running at:

```
http://localhost:8000
```

And install Playwright if you haven't already:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

Create a .env file in the root directory:


```bash

BASE_URL=http://localhost:8000
PASSWORD=secure123

```
---

### 🧾 Sample Test File

The test cases are written in `tests/api.spec.js`:

```bash
tests/api.spec.js
```

> Covers registration, login, calorie API, feedback, and auth-protected routes.

---

### ▶️ Running Tests

Run all tests using:

```bash
npx playwright test
```

Run with UI (headed mode):

```bash
npx playwright test tests/api.spec.js --headed
```

---

### ✅ Covered Test Cases

| Test Description                       | Method | Endpoint           |
| -------------------------------------- | ------ | ------------------ |
| ✅ Register a new user                  | POST   | `/auth/register`   |
| ✅ Login user & get token               | POST   | `/auth/login`      |
| ✅ Get calories for valid dish          | POST   | `/get-calories`    |
| ✅ Handle invalid dish name             | POST   | `/get-calories`    |
| ✅ Reject zero or negative servings     | POST   | `/get-calories`    |
| ✅ Submit or update feedback            | POST   | `/submit-feedback` |
| ❌ Reject calorie fetch without token   | POST   | `/get-calories`    |
| ❌ Reject feedback submit without token | POST   | `/submit-feedback` |

---

### 🛠️ Config Notes

* Modify `baseURL` if your server uses a different port.
* Ensure test data like emails are dynamic using `Date.now()` to avoid collisions.
* All endpoints requiring `Authorization` use Bearer token headers.

---

Would you like me to **append this to your main backend README file**, or generate a **dedicated README for tests**?
