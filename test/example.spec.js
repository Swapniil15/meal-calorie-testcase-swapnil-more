const { test, expect } = require('@playwright/test');

const baseURL = 'http://localhost:8000';
let email = `user${Date.now()}@mail.com`;
const password = 'secure123';
let token = '';

test.describe('Meal Calorie Count API Tests', () => {
  test('Register a new user', async ({ request }) => {
    const res = await request.post(`${baseURL}/auth/register`, {
      data: {
        first_name: 'John',
        last_name: 'Doe',
        email,
        password,
      },
    });
    expect(res.status()).toBe(201);
    const data = await res.json();
    expect(data.token).toBeTruthy();
  });

  test('Login the user', async ({ request }) => {
    const res = await request.post(`${baseURL}/auth/login`, {
      data: { email, password },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.token).toBeTruthy();
    token = data.token;
  });

  test('Fetch calories for a valid dish', async ({ request }) => {
    const res = await request.post(`${baseURL}/get-calories`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        dish_name: 'chicken biryani',
        servings: 2,
      },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.total_calories).toBeGreaterThan(0);
  });

  test('Handle non-existent dish', async ({ request }) => {
    const res = await request.post(`${baseURL}/get-calories`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        dish_name: 'xyzabcunicorninvaliddish',
        servings: 1,
      },
    });
    expect(res.status()).toBe(404);
    const data = await res.json();
    expect(data.error).toContain('Dish not found');
  });

  test('Reject zero/negative servings', async ({ request }) => {
    const res = await request.post(`${baseURL}/get-calories`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        dish_name: 'paneer butter masala',
        servings: 0,
      },
    });
    expect(res.status()).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('Invalid servings');
  });

  test('Submit feedback for dish', async ({ request }) => {
    const res = await request.post(`${baseURL}/submit-feedback`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        dish_name: 'chicken biryani',
        rating: 5,
        feedback: 'Excellent dish!',
      },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toMatch(/Feedback (saved|updated) successfully/);
  });

  test('Reject calorie request without auth', async ({ request }) => {
    const res = await request.post(`${baseURL}/get-calories`, {
      data: {
        dish_name: 'grilled salmon',
        servings: 1,
      },
    });
    expect(res.status()).toBe(401);
  });

  test('Reject feedback request without auth', async ({ request }) => {
    const res = await request.post(`${baseURL}/submit-feedback`, {
      data: {
        dish_name: 'grilled salmon',
        rating: 4,
        feedback: 'Tasty!',
      },
    });
    expect(res.status()).toBe(401);
  });
});
