import { test, expect } from './fixtures/test-setup';
import { TODO_ITEMS } from './fixtures/todo-fixtures';
import { generateRandomTodo, pluralize } from './utils/commonUtils';
import { getCurrentTimestamp } from './utils/dateUtils';

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await todoPage.assertTodoTexts([TODO_ITEMS[0]]);

    await todoPage.addTodo(TODO_ITEMS[1]);
    await todoPage.assertTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);

    await todoPage.checkNumberOfTodosInLocalStorage(2);
  });

  test('should clear text input field when an item is added', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await todoPage.assertInputEmpty();
    await todoPage.checkNumberOfTodosInLocalStorage(1);
  });

  test('should append new items to the bottom of the list', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);

    await expect(todoPage.page.getByText('3 items left')).toBeVisible();
    await todoPage.assertTodoCountText('3 items left');
    await todoPage.assertTodoCountText('3');
    await expect(todoPage.todoCount).toHaveText(/3/);

    await todoPage.assertTodoTexts(TODO_ITEMS);
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should add random todo item', async ({ todoPage }) => {
    const randomTodo = generateRandomTodo();
    console.log(`Adding random todo: ${randomTodo} at ${getCurrentTimestamp()}`);
    
    await todoPage.addTodo(randomTodo);
    await todoPage.assertTodoTexts([randomTodo]);
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
    await todoPage.assertAllTodosCompleted();
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);
  });

  test('should allow me to clear the complete state of all items', async ({ todoPage }) => {
    await todoPage.toggleAllTodos();
    await todoPage.untoggleAllTodos();

    await expect(todoPage.todoItems).toHaveClass(['', '', '']);
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({ todoPage }) => {
    await todoPage.toggleAllTodos();
    await todoPage.assertToggleAllChecked();
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);

    await todoPage.uncheckTodo(0);
    await todoPage.assertToggleAllChecked(false);

    await todoPage.checkTodo(0);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);
    await todoPage.assertToggleAllChecked();
  });
});

test.describe('Item', () => {
  test('should allow me to mark items as complete', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS.slice(0, 2));

    await todoPage.checkTodo(0);
    await todoPage.assertTodoCompleted(0);

    await todoPage.assertTodoCompleted(1, false);
    await todoPage.checkTodo(1);

    await todoPage.assertTodoCompleted(0);
    await todoPage.assertTodoCompleted(1);
  });

  test('should allow me to un-mark items as complete', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS.slice(0, 2));

    await todoPage.checkTodo(0);
    await todoPage.assertTodoCompleted(0);
    await todoPage.assertTodoCompleted(1, false);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await todoPage.uncheckTodo(0);
    await todoPage.assertTodoCompleted(0, false);
    await todoPage.assertTodoCompleted(1, false);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(0);
  });

  test('should allow me to edit an item', async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);
    await todoPage.editTodo(1, 'buy some sausages');

    await todoPage.assertTodoTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2]
    ]);
    await todoPage.checkTodoInLocalStorage('buy some sausages');
  });
});

test.describe('Editing', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should hide other controls when editing', async ({ todoPage }) => {
    await todoPage.startEditingTodo(1);

    const todoItem = await todoPage.getTodoItem(1);
    await expect(todoItem.getByRole('checkbox')).not.toBeVisible();
    await expect(todoItem.locator('label', { hasText: TODO_ITEMS[1] })).not.toBeVisible();

    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should save edits on blur', async ({ todoPage }) => {
    await todoPage.editTodoWithBlur(1, 'buy some sausages');

    await todoPage.assertTodoTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2]
    ]);
    await todoPage.checkTodoInLocalStorage('buy some sausages');
  });

  test('should trim entered text', async ({ todoPage }) => {
    await todoPage.editTodo(1, '    buy some sausages    ');

    await todoPage.assertTodoTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2]
    ]);
    await todoPage.checkTodoInLocalStorage('buy some sausages');
  });

  test('should remove the item if an empty text string was entered', async ({ todoPage }) => {
    await todoPage.editTodo(1, '');

    await todoPage.assertTodoTexts([
      TODO_ITEMS[0],
      TODO_ITEMS[2]
    ]);
  });

  test('should cancel edits on escape', async ({ todoPage }) => {
    await todoPage.cancelEditTodo(1, 'buy some sausages');
    await todoPage.assertTodoTexts(TODO_ITEMS);
  });
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await todoPage.assertTodoCountText('1');

    await todoPage.addTodo(TODO_ITEMS[1]);
    await todoPage.assertTodoCountText('2');

    await todoPage.checkNumberOfTodosInLocalStorage(2);
  });

  test('should display correct pluralization', async ({ todoPage }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    const count1 = await todoPage.getTodoCount();
    console.log(pluralize(count1, 'item'));

    await todoPage.addTodo(TODO_ITEMS[1]);
    const count2 = await todoPage.getTodoCount();
    console.log(pluralize(count2, 'item'));
  });
});

test.describe('Clear completed button', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);
  });

  test('should display the correct text', async ({ todoPage }) => {
    await todoPage.checkTodo(0);
    await todoPage.assertClearCompletedVisible();
  });

  test('should remove completed items when clicked', async ({ todoPage }) => {
    await todoPage.checkTodo(1);
    await todoPage.clearCompletedTodos();

    await todoPage.assertTodoCount(2);
    await todoPage.assertTodoTexts([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async ({ todoPage }) => {
    await todoPage.checkTodo(0);
    await todoPage.clearCompletedTodos();
    await todoPage.assertClearCompletedVisible(false);
  });
});

test.describe('Persistence', () => {
  test('should persist its data', async ({ todoPage, page }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS.slice(0, 2));
    await todoPage.checkTodo(0);

    await todoPage.assertTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await todoPage.assertTodoCompleted(0);
    await expect(todoPage.todoItems).toHaveClass(['completed', '']);

    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await page.reload();

    await todoPage.assertTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await todoPage.assertTodoCompleted(0);
    await expect(todoPage.todoItems).toHaveClass(['completed', '']);
  });
});

test.describe('Routing', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addMultipleTodos(TODO_ITEMS);
    await todoPage.checkTodoInLocalStorage(TODO_ITEMS[0]);
  });

  test('should allow me to display active items', async ({ todoPage }) => {
    await todoPage.checkTodo(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await todoPage.filterActive();
    await todoPage.assertTodoCount(2);
    await todoPage.assertTodoTexts([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should respect the back button', async ({ todoPage, page }) => {
    await todoPage.checkTodo(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await test.step('Showing all items', async () => {
      await todoPage.filterAll();
      await todoPage.assertTodoCount(3);
    });

    await test.step('Showing active items', async () => {
      await todoPage.filterActive();
    });

    await test.step('Showing completed items', async () => {
      await todoPage.filterCompleted();
    });

    await todoPage.assertTodoCount(1);
    await page.goBack();
    await todoPage.assertTodoCount(2);
    await page.goBack();
    await todoPage.assertTodoCount(3);
  });

  test('should allow me to display completed items', async ({ todoPage }) => {
    await todoPage.checkTodo(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await todoPage.filterCompleted();
    await todoPage.assertTodoCount(1);
  });

  test('should allow me to display all items', async ({ todoPage }) => {
    await todoPage.checkTodo(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await todoPage.filterActive();
    await todoPage.filterCompleted();
    await todoPage.filterAll();

    await todoPage.assertTodoCount(3);
  });

  test('should highlight the currently applied filter', async ({ todoPage }) => {
    await todoPage.assertAllFilterSelected();

    await todoPage.filterActive();
    await todoPage.assertActiveFilterSelected();

    await todoPage.filterCompleted();
    await todoPage.assertCompletedFilterSelected();
  });
});
