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
playwright.config.ts          # Test configuration
package.json
package-lock.json
tests/
  fixtures/
    todo-fixtures.ts          # Test data constants
    test-setup.ts             # Custom fixtures (auto-init)
  pages/
    todoPage.ts               # Page Object Model
  utils/                      # Utility functions
    commonUtils.ts            # General utilities
    dateUtils.ts              # Date/time helpers
  demo-todo-app.spec.ts       # Test specifications
```

### Directory Breakdown

- **`playwright.config.ts`** - Configuration for browsers, timeouts, retries, projects, and reporters
- **`tests/fixtures/`** - Contains test data, constants, and custom fixtures
  - `todo-fixtures.ts` - Shared test data
  - `test-setup.ts` - Custom fixtures with auto-initialization
- **`tests/pages/`** - Page Object Models for maintainable test structure
  - `todoPage.ts` - TodoMVC page object with all locators and actions
- **`tests/utils/`** - Reusable utility functions
  - `commonUtils.ts` - Random generators, retry logic, string helpers
  - `dateUtils.ts` - Date formatting, offset calculations
- **`tests/`** - Test specification files

## 🏗️ Architecture Patterns

### Page Object Model (POM)

This project uses the Page Object Model pattern for better maintainability:

```typescript
// tests/pages/todoPage.ts
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

### Utility Functions

Reusable utilities for common operations:

```typescript
import { generateRandomTodo, pluralize } from './utils/commonUtils';
import { getCurrentTimestamp, formatDate } from './utils/dateUtils';

test('example', async ({ todoPage }) => {
  const randomTodo = generateRandomTodo();
  console.log(`Created at: ${getCurrentTimestamp()}`);
});
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
npx playwright test tests/fixtures/
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
import { test, expect } from './fixtures/test-setup';
import { TODO_ITEMS } from './fixtures/todo-fixtures';

test('add new todo', async ({ todoPage }) => {
  await todoPage.addTodo(TODO_ITEMS[0]);
  await todoPage.assertTodoTexts([TODO_ITEMS[0]]);
});
```

### Example: Using Utilities

```typescript
import { generateRandomTodo } from './utils/commonUtils';
import { getCurrentTimestamp } from './utils/dateUtils';

test('add random todo', async ({ todoPage }) => {
  const todo = generateRandomTodo();
  console.log(`Adding: ${todo} at ${getCurrentTimestamp()}`);
  
  await todoPage.addTodo(todo);
  await todoPage.assertTodoCount(1);
});
```

## 📦 Best Practices

This project follows Playwright best practices:

✅ **Page Object Model** - Centralized locators and actions  
✅ **Custom Fixtures** - Reusable setup with dependency injection  
✅ **Utility Functions** - DRY principle for common operations  
✅ **Type Safety** - Full TypeScript support  
✅ **Test Isolation** - Each test runs independently  
✅ **Parallel Execution** - Tests run concurrently by default  
✅ **Auto-waiting** - Built-in smart waiting for elements  
✅ **Assertions** - Web-first assertions with auto-retry  

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
