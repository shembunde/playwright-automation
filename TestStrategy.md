
#  Test Strategy Document

**Project Name:** Fullstack Todo App  
**Components Covered:** React Frontend + Node.js API Backend  
**Prepared By:** Shem Obura

---

## 1. **Objective**

The objective of this testing strategy is to verify that the Todo App functions as expected across both UI and backend layers. The application supports user login and full CRUD operations on todo items.

---

## 2. **Scope of Testing**

###  **In Scope**
- Functional UI testing (login, todo creation, editing, deletion)
- Backend API testing (`/login`, `/items`, `/items/:id`)
- Positive and negative test cases
- In-memory test environment (no DB)

###  **Out of Scope**
- Performance, load, and stress testing
- Cross-browser compatibility
- Database or persistence testing

---

## 3. **Testing Types & Tools**

| Testing Type       | Tool(s) Used       | Purpose                                  |
|--------------------|--------------------|-------------------------------------------|
| UI Automation      | Playwright         | End-to-end testing of login + todo flows  |
| API Automation     | Supertest + Jest   | Verifying correctness of REST API         |
| Manual Smoke Test  | Browser + Postman  | Initial checks before automation          |

---

## 4. **Test Coverage Areas**

| Feature                 | UI Test | API Test |
|-------------------------|---------|----------|
| Login (valid/invalid)   | yes      | yes       |
| Get All Todos           | yes      | yes       |
| Create Todo             | yes      | yes       |
| Update Todo             | yes      | yes       |
| Delete Todo             | yes      | yes       |
| Error Handling (404s)   | no      | yes       |

---

## 5. **Test Data & Environment**

- **Frontend:** React served via `npm start` on `http://localhost:3000`
- **Backend:** Node.js/Express served on `http://localhost:5000`
- **Test Data:** In-memory (reset on each server restart)
- **Login Credentials:**
  -  Valid: `username: test`, `password: 123`
  -  Invalid: Anything else

---

## 6. **Assumptions**

- Only one user is required for login (no registration).
- All data is ephemeral (no persistence).
- No authentication token is needed for Todo CRUD operations (for simplicity).
- Backend runs locally and independently of the frontend.

---

## 7. **Running the Tests**

###  UI Tests (Playwright)

```bash
cd tests
npx playwright test
```

###  API Tests (Supertest + Jest)

```bash
cd server
npm install
npm test
```

> Note: Ensure the backend server is **running** before executing UI tests.

---

## 8. **Limitations**

- No real database — data resets every time the server restarts.
- No form validation (e.g., empty fields allowed).
- Only tested in Chromium (via Playwright).
