import { expect, type Locator, type Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  
  // Locators
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoTitles: Locator;
  readonly todoCount: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly clearCompletedButton: Locator;
  readonly activeLink: Locator;
  readonly completedLink: Locator;
  readonly allLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoTitles = page.getByTestId('todo-title');
    this.todoCount = page.getByTestId('todo-count');
    this.toggleAllCheckbox = page.getByLabel('Mark all as complete');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.activeLink = page.getByRole('link', { name: 'Active' });
    this.completedLink = page.getByRole('link', { name: 'Completed' });
    this.allLink = page.getByRole('link', { name: 'All' });
  }

  // Navigation
  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  // Actions - Creating Todos
  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addMultipleTodos(items: readonly string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  // Actions - Todo Items
  async getTodoItem(index: number): Promise<Locator> {
    return this.todoItems.nth(index);
  }

  async checkTodo(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async uncheckTodo(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').uncheck();
  }

  async editTodo(index: number, newText: string) {
    const todoItem = this.todoItems.nth(index);
    await todoItem.dblclick();
    const editBox = todoItem.getByRole('textbox', { name: 'Edit' });
    await editBox.fill(newText);
    await editBox.press('Enter');
  }

  async editTodoWithBlur(index: number, newText: string) {
    const todoItem = this.todoItems.nth(index);
    await todoItem.dblclick();
    const editBox = todoItem.getByRole('textbox', { name: 'Edit' });
    await editBox.fill(newText);
    await editBox.dispatchEvent('blur');
  }

  async cancelEditTodo(index: number, newText: string) {
    const todoItem = this.todoItems.nth(index);
    await todoItem.dblclick();
    const editBox = todoItem.getByRole('textbox', { name: 'Edit' });
    await editBox.fill(newText);
    await editBox.press('Escape');
  }

  async startEditingTodo(index: number) {
    await this.todoItems.nth(index).dblclick();
  }

  async deleteTodo(index: number) {
    const todoItem = this.todoItems.nth(index);
    await todoItem.hover();
    await todoItem.getByRole('button', { name: 'Delete' }).click();
  }

  // Actions - Bulk Operations
  async toggleAllTodos() {
    await this.toggleAllCheckbox.check();
  }

  async untoggleAllTodos() {
    await this.toggleAllCheckbox.uncheck();
  }

  async clearCompletedTodos() {
    await this.clearCompletedButton.click();
  }

  // Actions - Filtering
  async filterActive() {
    await this.activeLink.click();
  }

  async filterCompleted() {
    await this.completedLink.click();
  }

  async filterAll() {
    await this.allLink.click();
  }

  // Assertions
  async assertTodoTexts(expectedTexts: readonly string[] | string[]) {
    await expect(this.todoTitles).toHaveText(expectedTexts as string[]);
  }

  async assertTodoCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  async assertTodoCountText(text: string) {
    await expect(this.todoCount).toContainText(text);
  }

  async assertInputEmpty() {
    await expect(this.newTodoInput).toBeEmpty();
  }

  async assertTodoCompleted(index: number, isCompleted: boolean = true) {
    const todoItem = this.todoItems.nth(index);
    if (isCompleted) {
      await expect(todoItem).toHaveClass('completed');
    } else {
      await expect(todoItem).not.toHaveClass('completed');
    }
  }

  async assertAllTodosCompleted() {
    const count = await this.todoItems.count();
    const classes = Array(count).fill('completed');
    await expect(this.todoItems).toHaveClass(classes);
  }

  async assertToggleAllChecked(isChecked: boolean = true) {
    if (isChecked) {
      await expect(this.toggleAllCheckbox).toBeChecked();
    } else {
      await expect(this.toggleAllCheckbox).not.toBeChecked();
    }
  }

  async assertClearCompletedVisible(isVisible: boolean = true) {
    if (isVisible) {
      await expect(this.clearCompletedButton).toBeVisible();
    } else {
      await expect(this.clearCompletedButton).toBeHidden();
    }
  }

  async assertActiveFilterSelected() {
    await expect(this.activeLink).toHaveClass('selected');
  }

  async assertCompletedFilterSelected() {
    await expect(this.completedLink).toHaveClass('selected');
  }

  async assertAllFilterSelected() {
    await expect(this.allLink).toHaveClass('selected');
  }

  // Local Storage Helpers
  async checkNumberOfTodosInLocalStorage(expected: number) {
    return await this.page.waitForFunction(e => {
      return JSON.parse(localStorage['react-todos']).length === e;
    }, expected);
  }

  async checkNumberOfCompletedTodosInLocalStorage(expected: number) {
    return await this.page.waitForFunction(e => {
      return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e;
    }, expected);
  }

  async checkTodoInLocalStorage(title: string) {
    return await this.page.waitForFunction(t => {
      return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t);
    }, title);
  }

  // Utility Methods
  async getTodoCount(): Promise<number> {
    return await this.todoItems.count();
  }

  async getCompletedTodoCount(): Promise<number> {
    const items = await this.todoItems.all();
    let count = 0;
    for (const item of items) {
      const classes = await item.getAttribute('class');
      if (classes?.includes('completed')) {
        count++;
      }
    }
    return count;
  }

  async getActiveTodoCount(): Promise<number> {
    const total = await this.getTodoCount();
    const completed = await this.getCompletedTodoCount();
    return total - completed;
  }
}
