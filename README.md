# Playwright Web Automation

Playwright Test is an end-to-end test framework for modern web apps. It bundles test runner, assertions, isolation, parallelization and rich tooling.

## 🚀 Key Features

- Supports **Chromium**, **WebKit**, and **Firefox** browsers
- Cross-platform: Windows, Linux, and macOS
- Headless or headed mode
- Native mobile emulation for Chrome (Android) and Mobile Safari
- Parallel test execution by default
- Rich tooling and debugging capabilities
- Built-in **Page Object Model (POM)** pattern
- Custom fixtures for better test organization
- Reusable utility functions
- Environment variable configuration

## 📋 Prerequisites

- **Node.js**: latest 22.x, or 24.x
- **Operating System**: 
  - Windows 11 or later
  - macOS 14 or later

## 🔧 Installation

Initialize Playwright in your project:

```bash
npm init playwright@latest
```

During installation, you will be prompted to choose:
- TypeScript or JavaScript (default: TypeScript)
- Tests folder name (default: `tests`, or `e2e` if `tests` already exists)
- Add a GitHub Actions workflow (recommended for CI)
- Install Playwright browsers (default: yes)

### Alternative: VS Code Extension

You can also create and run tests using the [VS Code Extension](https://playwright.dev/docs/getting-started-vscode).

## 📂 Project Structure

This project follows best practices with a well-organized structure:

```
playwright-web-automation-pom/
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI/CD
├── fixtures/
│   └── todo-fixtures.ts          # Custom fixtures (auto-init)
├── pages/
│   └── todoPage.ts               # Page Object Model
├── tests/
│   └── demo-todo-app.spec.ts     # Test specifications
├── utils/
│   └── constants.ts              # Constants & environment variables
├── .env.example                  # Environment variables template
├── .env                          # Environment variables (DO NOT COMMIT)
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
└── playwright.config.ts          # Test configuration
```

### Directory Breakdown

- **`.github/workflows/`** - GitHub Actions workflow for CI/CD automation
- **`fixtures/`** - Contains test data, constants, and custom fixtures
  - `todo-fixtures.ts` - Custom fixtures with auto-initialization
- **`pages/`** - Page Object Models for maintainable test structure
  - `todoPage.ts` - TodoMVC page object with all locators and actions
- **`tests/`** - Test specification files
  - `demo-todo-app.spec.ts` - Todo MVC test cases
- **`utils/`** - Reusable utility functions and constants
  - `constants.ts` - Test data constants and environment variables
- **`playwright.config.ts`** - Configuration for browsers, timeouts, retries, projects, and reporters

## ⚙️ Environment Setup

This project uses environment variables for configuration flexibility.

### Setup Steps

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your configuration:**
   ```env
   BASE_URL=https://demo.playwright.dev/todomvc
   ```

3. **The `.env` file is already in `.gitignore`** - never commit it!

### Environment Variables

| Variable | Description            | Default                               |
|----------|------------------------|---------------------------------------|
| `BASE_URL` | Application base URL | `https://demo.playwright.dev/todomvc` |

**Note:** Team members cloning this project must create their own `.env` file from `.env.example`.

## 🏗️ Architecture Patterns

### Page Object Model (POM)

This project uses the Page Object Model pattern for better maintainability:

```typescript
// pages/todoPage.ts
export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  
  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }
}
```

### Custom Fixtures

Custom fixtures automatically initialize page objects:

```typescript
// Before (manual initialization)
test('my test', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();
  // test code...
});

// After (with custom fixtures)
test('my test', async ({ todoPage }) => {
  // todoPage is ready to use!
  await todoPage.addTodo('test');
});
```

### Constants & Environment Variables

Test data and configuration are centralized:

```typescript
// utils/constants.ts
import dotenv from 'dotenv';
dotenv.config();

export const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

export const BASE_URL = process.env.BASE_URL || 'https://demo.playwright.dev/todomvc';
```

## 🧪 Running Tests

### Run all tests

```bash
npx playwright test
```

By default, tests run:
- In **headless mode** (no browser UI visible)
- In **parallel** across all browsers (Chromium, Firefox, WebKit)
- Results are displayed in the terminal

### Running tests with options

**See the browser while tests run:**
```bash
npx playwright test --headed
```

**Run tests in a single browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Run a specific test file:**
```bash
npx playwright test tests/demo-todo-app.spec.ts
```

**Run tests matching a title:**
```bash
npx playwright test -g "should allow me to add todo items"
```

**Run tests in a specific folder:**
```bash
npx playwright test tests/
```

**List all available tests:**
```bash
npx playwright test --list
```

**Run tests in debug mode:**
```bash
npx playwright test --debug
```

**Open UI Mode:**
```bash
npx playwright test --ui
```

For more details on filtering, headed mode, sharding and retries, see [Running Tests](https://playwright.dev/docs/running-tests) documentation.

## 🎨 UI Mode

Run tests with UI Mode for watch mode, live step view, time travel debugging and more:

```bash
npx playwright test --ui
```

UI Mode provides an interactive interface to:
- ✅ Run and watch tests in real-time
- ✅ Time-travel through test execution
- ✅ Inspect DOM snapshots
- ✅ View network activity
- ✅ Debug with step-by-step execution

## 📊 HTML Test Report

After test execution, the HTML Reporter provides a dashboard filterable by browser, passed, failed, skipped, flaky tests and more.

The report auto-opens only when failures occur. To open it manually:

```bash
npx playwright show-report
```

Click on any test to inspect:
- ❌ Error messages and stack traces
- 📸 Screenshots and videos
- 🔍 Execution steps with timing
- 📎 Attachments and logs

## 🐛 Debugging

### Using Debug Mode

```bash
npx playwright test --debug
```

This opens Playwright Inspector with:
- Step-through execution
- Console logs
- Network activity
- DOM snapshots

### Using VS Code Debugger

1. Set breakpoints in your test code
2. Run tests in debug mode from VS Code
3. Use VS Code debugging features

### Debugging in UI Mode

```bash
npx playwright test --ui
```

UI Mode is the recommended way to debug, offering the best experience.

## 🔄 Updating Playwright

Update Playwright and download new browser binaries:

```bash
npm install -D @playwright/test@latest
npx playwright install --with-deps
```

### Check installed version

```bash
npx playwright --version
```

## 🧩 Writing Tests

### Example: Using Custom Fixtures

```typescript
import { test, expect } from '../fixtures/todo-fixtures';
import { TODO_ITEMS } from '../utils/constants';

test('add new todo', async ({ todoPage }) => {
  await todoPage.addTodo(TODO_ITEMS[0]);
  await todoPage.expectTodoTexts([TODO_ITEMS[0]]);
});
```

### Example: Using Constants

```typescript
import { TODO_ITEMS, BASE_URL } from '../utils/constants';

test('verify base URL', async ({ todoPage }) => {
  await todoPage.goto();
  expect(todoPage.page.url()).toBe(BASE_URL);
});
```

## 🔄 CI/CD Integration

This project includes a GitHub Actions workflow that automatically:
- ✅ Runs tests on push and pull requests
- ✅ Sets up environment variables from `.env.example`
- ✅ Caches Playwright browsers for faster execution
- ✅ Uploads test reports as artifacts
- ✅ Runs tests in parallel

The workflow is configured in `.github/workflows/playwright.yml`.

## 🎯 Common Commands Cheatsheet

```bash
# Run all tests
npx playwright test

# Run in headed mode
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test tests/demo-todo-app.spec.ts

# Run tests matching title
npx playwright test -g "should add todo"

# Debug mode
npx playwright test --debug

# UI mode
npx playwright test --ui

# Show report
npx playwright show-report

# List tests
npx playwright test --list

# Update Playwright
npm install -D @playwright/test@latest
npx playwright install --with-deps
```

## 📚 Documentation

For complete documentation, visit:
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Fixtures](https://playwright.dev/docs/test-fixtures)
- [Debugging](https://playwright.dev/docs/debug)
- [Test Assertions](https://playwright.dev/docs/test-assertions)

## 📝 Additional Resources

- [GitHub Actions Workflow](./.github/workflows/playwright.yml) - CI/CD configuration
