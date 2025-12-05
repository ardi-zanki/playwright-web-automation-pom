import { expect, type Locator, type Page } from '@playwright/test';
import { BASE_URL } from '../config/environment';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoTitle: Locator;
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
    this.todoTitle = page.getByTestId('todo-title');
    this.todoCount = page.getByTestId('todo-count');
    this.toggleAllCheckbox = page.getByLabel('Mark all as complete');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.activeLink = page.getByRole('link', { name: 'Active' });
    this.completedLink = page.getByRole('link', { name: 'Completed' });
    this.allLink = page.getByRole('link', { name: 'All' });
  }

  // Navigation
  async goto() {
    await this.page.goto(BASE_URL);
  }

  // Actions
  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addMultipleTodos(todos: readonly string[] | string[]) {
    for (const item of todos) {
      await this.addTodo(item);
    }
  }

  async toggleTodoAtIndex(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async untoggleTodoAtIndex(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').uncheck();
  }

  async toggleAllTodos() {
    await this.toggleAllCheckbox.check();
  }

  async untoggleAllTodos() {
    await this.toggleAllCheckbox.uncheck();
  }

  async editTodoAtIndex(index: number, newText: string) {
    const todo = this.todoItems.nth(index);
    await todo.dblclick();
    await todo.getByRole('textbox', { name: 'Edit' }).fill(newText);
    await todo.getByRole('textbox', { name: 'Edit' }).press('Enter');
  }

  async clearCompletedTodos() {
    await this.clearCompletedButton.click();
  }

  async filterByActive() {
    await this.activeLink.click();
  }

  async filterByCompleted() {
    await this.completedLink.click();
  }

  async filterByAll() {
    await this.allLink.click();
  }

  // Assertions
  async expectTodoCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  async expectTodoTexts(texts: readonly string[] | string[]) {
    await expect(this.todoTitle).toHaveText(texts as string[]);
  }

  async expectInputToBeEmpty() {
    await expect(this.newTodoInput).toBeEmpty();
  }

  async expectTodoCountText(text: string) {
    await expect(this.todoCount).toContainText(text);
  }

  async expectAllTodosCompleted() {
    const count = await this.todoItems.count();
    const completedClasses = Array(count).fill('completed');
    await expect(this.todoItems).toHaveClass(completedClasses);
  }

  async expectTodoAtIndexToBeCompleted(index: number) {
    await expect(this.todoItems.nth(index)).toHaveClass('completed');
  }

  async expectTodoAtIndexNotToBeCompleted(index: number) {
    await expect(this.todoItems.nth(index)).not.toHaveClass('completed');
  }

  async expectToggleAllToBeChecked() {
    await expect(this.toggleAllCheckbox).toBeChecked();
  }

  async expectToggleAllNotToBeChecked() {
    await expect(this.toggleAllCheckbox).not.toBeChecked();
  }

  async expectClearCompletedVisible() {
    await expect(this.clearCompletedButton).toBeVisible();
  }

  async expectClearCompletedHidden() {
    await expect(this.clearCompletedButton).toBeHidden();
  }

  async expectActiveFilterSelected() {
    await expect(this.activeLink).toHaveClass('selected');
  }

  async expectCompletedFilterSelected() {
    await expect(this.completedLink).toHaveClass('selected');
  }

  async expectAllFilterSelected() {
    await expect(this.allLink).toHaveClass('selected');
  }

  // Helper methods for localStorage checks
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

  async checkTodosInLocalStorage(title: string) {
    return await this.page.waitForFunction(t => {
      return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t);
    }, title);
  }

  // Advanced interactions
  async editTodoWithBlur(index: number, newText: string) {
    const todo = this.todoItems.nth(index);
    await todo.dblclick();
    await todo.getByRole('textbox', { name: 'Edit' }).fill(newText);
    await todo.getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur');
  }

  async cancelEditTodo(index: number, newText: string) {
    const todo = this.todoItems.nth(index);
    await todo.dblclick();
    await todo.getByRole('textbox', { name: 'Edit' }).fill(newText);
    await todo.getByRole('textbox', { name: 'Edit' }).press('Escape');
  }

  async deleteTodoByEmptyEdit(index: number) {
    const todo = this.todoItems.nth(index);
    await todo.dblclick();
    await todo.getByRole('textbox', { name: 'Edit' }).fill('');
    await todo.getByRole('textbox', { name: 'Edit' }).press('Enter');
  }

  async expectEditBoxVisible(index: number) {
    const todo = this.todoItems.nth(index);
    await expect(todo.getByRole('textbox', { name: 'Edit' })).toBeVisible();
  }

  async expectCheckboxNotVisible(index: number) {
    const todo = this.todoItems.nth(index);
    await expect(todo.getByRole('checkbox')).not.toBeVisible();
  }
}
