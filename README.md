# Playwright Web Automation

Playwright Test is an end-to-end test framework for modern web apps. It bundles test runner, assertions, isolation, parallelization and rich tooling.

## 🚀 Key Features

- Supports **Chromium**, **WebKit**, and **Firefox** browsers
- Cross-platform: Windows, Linux, and macOS
- Headless or headed mode
- Native mobile emulation for Chrome (Android) and Mobile Safari
- Parallel test execution by default
- Rich tooling and debugging capabilities

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

After installation, your project structure will look like this:

```
playwright.config.ts          # Test configuration
package.json
package-lock.json
tests/
  fixtures/
    todo-fixtures.ts          # Test data constants
  pages/
    todo-page.ts              # Page Object Model
  demo-todo-app.spec.ts       # Test specifications
```

- `playwright.config.ts` - Configuration file for target browsers, timeouts, retries, projects, reporters, and more
- `tests/fixtures/` - Contains test data and constants
- `tests/pages/` - Contains Page Object Models for better test structure
- `tests/` - Contains test specification files

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
```

**Run a specific test file:**
```bash
npx playwright test tests/demo-todo-app.spec.ts
```

**List all available tests:**
```bash
npx playwright test --list
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

UI Mode provides an interactive interface to run and debug your tests with real-time feedback.

## 📊 HTML Test Report

After test execution, the HTML Reporter provides a dashboard filterable by browser, passed, failed, skipped, flaky tests and more.

The report auto-opens only when failures occur. To open it manually:

```bash
npx playwright show-report
```

Click on any test to inspect errors, attachments, and execution steps.

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

## 📚 Documentation

For complete documentation, visit:
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
