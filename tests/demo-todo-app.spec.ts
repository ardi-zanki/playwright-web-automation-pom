import { test, expect } from '../fixtures/todo-fixtures';
import { TODO_ITEMS } from '../utils/constants';

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ todoPage }) => {
    // Create 1st todo
    await todoPage.addTodo(TODO_ITEMS[0]);
    await todoPage.expectTodoTexts([TODO_ITEMS[0]]);

    // Create 2nd todo
    await todoPage.addTodo(TODO_ITEMS[1]);
    await todoPage.expectTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);

    await todoPage.checkNumberOfTodosInLocalStorage(2);
  });

  test('should clear text input field when an item is added', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await todoPage.expectInputToBeEmpty();
    await todoPage.checkNumberOfTodosInLocalStorage(1);
  });

  test('should append new items to the bottom of the list', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);

    // Check test using different methods
    await expect(todoPage.page.getByText('3 items left')).toBeVisible();
    await todoPage.expectTodoCountText('3 items left');
    await todoPage.expectTodoCountText('3');

    await todoPage.expectTodoTexts(TODO_ITEMS);
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });
});

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test.afterEach(async ({ todoPage }) => {
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should allow me to mark all items as completed', async ({ todoPage }) => {
    await todoPage.toggleAllTodos();
    await todoPage.expectAllTodosCompleted();
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);
  });

  test('should allow me to clear the complete state of all items', async ({ todoPage }) => {
    await todoPage.toggleAllTodos();
    await todoPage.untoggleAllTodos();

    // Should be no completed classes
    await expect(todoPage.todoItems).toHaveClass(['', '', '']);
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({ todoPage }) => {
    await todoPage.toggleAllTodos();
    await todoPage.expectToggleAllToBeChecked();
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);

    // Uncheck first todo
    await todoPage.untoggleTodoAtIndex(0);
    await todoPage.expectToggleAllNotToBeChecked();

    // Check first todo again
    await todoPage.toggleTodoAtIndex(0);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);
    await todoPage.expectToggleAllToBeChecked();
  });
});

test.describe('Item', () => {
  test('should allow me to mark items as complete', async ({ todoPage }) => {
    // Create two items
    await todoPage.addMultipleTodos(TODO_ITEMS.slice(0, 2));

    // Check first item
    await todoPage.toggleTodoAtIndex(0);
    await todoPage.expectTodoAtIndexToBeCompleted(0);

    // Check second item
    await todoPage.expectTodoAtIndexNotToBeCompleted(1);
    await todoPage.toggleTodoAtIndex(1);

    // Assert both completed
    await todoPage.expectTodoAtIndexToBeCompleted(0);
    await todoPage.expectTodoAtIndexToBeCompleted(1);
  });

  test('should allow me to un-mark items as complete', async ({ todoPage }) => {
    // Create two items
    await todoPage.addMultipleTodos(TODO_ITEMS.slice(0, 2));

    await todoPage.toggleTodoAtIndex(0);
    await todoPage.expectTodoAtIndexToBeCompleted(0);
    await todoPage.expectTodoAtIndexNotToBeCompleted(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await todoPage.untoggleTodoAtIndex(0);
    await todoPage.expectTodoAtIndexNotToBeCompleted(0);
    await todoPage.expectTodoAtIndexNotToBeCompleted(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(0);
  });

  test('should allow me to edit an item', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);

    const todoItems = todoPage.todoItems;
    const secondTodo = todoItems.nth(1);
    await secondTodo.dblclick();
    await expect(secondTodo.getByRole('textbox', { name: 'Edit' })).toHaveValue(TODO_ITEMS[1]);
    
    await todoPage.editTodoAtIndex(1, 'buy some sausages');

    await todoPage.expectTodoTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2]
    ]);
    await todoPage.checkTodosInLocalStorage('buy some sausages');
  });
});

test.describe('Editing', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should hide other controls when editing', async ({ todoPage }) => {
    const todoItem = todoPage.todoItems.nth(1);
    await todoItem.dblclick();
    await todoPage.expectCheckboxNotVisible(1);
    await expect(todoItem.locator('label', { hasText: TODO_ITEMS[1] })).not.toBeVisible();
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should save edits on blur', async ({ todoPage }) => {
    await todoPage.editTodoWithBlur(1, 'buy some sausages');

    await todoPage.expectTodoTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
    await todoPage.checkTodosInLocalStorage('buy some sausages');
  });

  test('should trim entered text', async ({ todoPage }) => {
    await todoPage.editTodoAtIndex(1, '    buy some sausages    ');

    await todoPage.expectTodoTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
    await todoPage.checkTodosInLocalStorage('buy some sausages');
  });

  test('should remove the item if an empty text string was entered', async ({ todoPage }) => {
    await todoPage.deleteTodoByEmptyEdit(1);

    await todoPage.expectTodoTexts([
      TODO_ITEMS[0],
      TODO_ITEMS[2],
    ]);
  });

  test('should cancel edits on escape', async ({ todoPage }) => {
    await todoPage.cancelEditTodo(1, 'buy some sausages');
    await todoPage.expectTodoTexts(TODO_ITEMS);
  });
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await todoPage.expectTodoCountText('1');

    await todoPage.addTodo(TODO_ITEMS[1]);
    await todoPage.expectTodoCountText('2');

    await todoPage.checkNumberOfTodosInLocalStorage(2);
  });
});

test.describe('Clear completed button', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);
  });

  test('should display the correct text', async ({ todoPage, page }) => {
    await page.locator('.todo-list li .toggle').first().check();
    await todoPage.expectClearCompletedVisible();
  });

  test('should remove completed items when clicked', async ({ todoPage }) => {
    await todoPage.toggleTodoAtIndex(1);
    await todoPage.clearCompletedTodos();
    await todoPage.expectTodoCount(2);
    await todoPage.expectTodoTexts([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async ({ todoPage, page }) => {
    await page.locator('.todo-list li .toggle').first().check();
    await todoPage.clearCompletedTodos();
    await todoPage.expectClearCompletedHidden();
  });
});

test.describe('Persistence', () => {
  test('should persist its data', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS.slice(0, 2));

    const firstTodoCheck = todoPage.todoItems.nth(0).getByRole('checkbox');
    await firstTodoCheck.check();
    await todoPage.expectTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoPage.todoItems).toHaveClass(['completed', '']);

    // Ensure there is 1 completed item
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    // Now reload
    await todoPage.page.reload();
    await todoPage.expectTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoPage.todoItems).toHaveClass(['completed', '']);
  });
});

test.describe('Routing', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);
    await todoPage.checkTodosInLocalStorage(TODO_ITEMS[0]);
  });

  test('should allow me to display active items', async ({ todoPage }) => {
    await todoPage.toggleTodoAtIndex(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);
    
    await todoPage.filterByActive();
    await todoPage.expectTodoCount(2);
    await todoPage.expectTodoTexts([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should respect the back button', async ({ todoPage, page }) => {
    await todoPage.toggleTodoAtIndex(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await test.step('Showing all items', async () => {
      await todoPage.filterByAll();
      await todoPage.expectTodoCount(3);
    });

    await test.step('Showing active items', async () => {
      await todoPage.filterByActive();
    });

    await test.step('Showing completed items', async () => {
      await todoPage.filterByCompleted();
    });

    await todoPage.expectTodoCount(1);
    await page.goBack();
    await todoPage.expectTodoCount(2);
    await page.goBack();
    await todoPage.expectTodoCount(3);
  });

  test('should allow me to display completed items', async ({ todoPage }) => {
    await todoPage.toggleTodoAtIndex(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);
    await todoPage.filterByCompleted();
    await todoPage.expectTodoCount(1);
  });

  test('should allow me to display all items', async ({ todoPage }) => {
    await todoPage.toggleTodoAtIndex(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);
    await todoPage.filterByActive();
    await todoPage.filterByCompleted();
    await todoPage.filterByAll();
    await todoPage.expectTodoCount(3);
  });

  test('should highlight the currently applied filter', async ({ todoPage }) => {
    await todoPage.expectAllFilterSelected();
    
    await todoPage.filterByActive();
    await todoPage.expectActiveFilterSelected();
    
    await todoPage.filterByCompleted();
    await todoPage.expectCompletedFilterSelected();
  });
});
