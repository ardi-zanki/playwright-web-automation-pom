# Test Cases - Todo MVC Application

**Application Under Test:** Todo MVC Demo  
**URL:** https://demo.playwright.dev/todomvc  
**Test Framework:** Playwright with TypeScript  
**Pattern:** Page Object Model (POM)  
**Last Updated:** December 2025

---

## Test Suite Overview

| Test Suite | Total Tests | Description |
|------------|-------------|-------------|
| New Todo | 3 | Creating new todo items |
| Mark all as completed | 3 | Bulk complete/uncomplete operations |
| Item | 3 | Individual item operations |
| Editing | 5 | Edit functionality and validation |
| Counter | 1 | Todo counter display |
| Clear completed button | 3 | Remove completed items |
| Persistence | 1 | Data persistence validation |
| Routing | 5 | Navigation and filtering |
| **Total** | **24** | **All test scenarios** |

---

## 1. New Todo Test Suite

### TC-001: Add Single Todo Item
**Objective:** Verify user can add a single todo item  
**Priority:** High  
**Preconditions:** Navigate to Todo MVC application

**Test Steps:**
1. Enter "buy some cheese" in the todo input field
2. Press Enter key

**Expected Results:**
- Todo item appears in the list
- Input field is cleared
- Counter shows "1 item left"
- Item is saved to localStorage

**Test Data:**
- Input: "buy some cheese"

**Status:** ✅ Automated

---

### TC-002: Add Multiple Todo Items
**Objective:** Verify user can add multiple todo items  
**Priority:** High  
**Preconditions:** Navigate to Todo MVC application

**Test Steps:**
1. Enter "buy some cheese" and press Enter
2. Enter "feed the cat" and press Enter
3. Verify both items appear in list

**Expected Results:**
- Both todo items are displayed in order
- Input field is cleared after each entry
- Counter shows "2 items left"
- Items are saved to localStorage

**Test Data:**
- Input 1: "buy some cheese"
- Input 2: "feed the cat"

**Status:** ✅ Automated

---

### TC-003: Clear Input Field After Adding Item
**Objective:** Verify input field is cleared after adding a todo  
**Priority:** Medium  
**Preconditions:** Navigate to Todo MVC application

**Test Steps:**
1. Enter "buy some cheese" in input field
2. Press Enter key
3. Check input field value

**Expected Results:**
- Todo item is added to list
- Input field is empty
- Input field is ready for next entry

**Status:** ✅ Automated

---

### TC-004: Append Items to Bottom of List
**Objective:** Verify new items are appended to the bottom of the list  
**Priority:** Medium  
**Preconditions:** Navigate to Todo MVC application

**Test Steps:**
1. Add "buy some cheese"
2. Add "feed the cat"
3. Add "book a doctors appointment"
4. Verify order of items

**Expected Results:**
- Items appear in order they were added
- Counter shows "3 items left"
- Order is: cheese → cat → appointment
- localStorage contains 3 items

**Test Data:**
- Items: ["buy some cheese", "feed the cat", "book a doctors appointment"]

**Status:** ✅ Automated

---

## 2. Mark All as Completed Test Suite

### TC-005: Mark All Items as Completed
**Objective:** Verify user can mark all items as completed at once  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Click "Mark all as complete" checkbox
2. Verify all items have 'completed' class

**Expected Results:**
- All items show as completed (strikethrough)
- "Mark all as complete" checkbox is checked
- Counter shows "0 items left"
- localStorage shows 3 completed items

**Status:** ✅ Automated

---

### TC-006: Clear Complete State of All Items
**Objective:** Verify user can uncheck all completed items  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items
- Mark all as completed

**Test Steps:**
1. Click "Mark all as complete" checkbox to uncheck
2. Verify all items are unchecked

**Expected Results:**
- All items show as active (no strikethrough)
- "Mark all as complete" checkbox is unchecked
- Counter shows "3 items left"
- No completed classes on items

**Status:** ✅ Automated

---

### TC-007: Toggle All Checkbox State Synchronization
**Objective:** Verify "Mark all as complete" checkbox syncs with item states  
**Priority:** Medium  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Click "Mark all as complete" checkbox
2. Verify checkbox is checked
3. Uncheck first todo item manually
4. Verify "Mark all as complete" checkbox is now unchecked
5. Check first todo item again
6. Verify "Mark all as complete" checkbox is checked again

**Expected Results:**
- Checkbox state reflects all items' completion state
- Unchecking one item unchecks "Mark all as complete"
- Completing all items checks "Mark all as complete"

**Status:** ✅ Automated

---

## 3. Item Operations Test Suite

### TC-008: Mark Single Item as Complete
**Objective:** Verify user can mark individual items as complete  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 2 todo items

**Test Steps:**
1. Click checkbox on first item
2. Verify first item has 'completed' class
3. Click checkbox on second item
4. Verify second item has 'completed' class

**Expected Results:**
- First item shows strikethrough text
- Second item shows strikethrough text
- Both items have 'completed' class
- Other items remain unchanged

**Status:** ✅ Automated

---

### TC-009: Unmark Item as Complete
**Objective:** Verify user can unmark completed items  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 2 todo items
- Mark first item as complete

**Test Steps:**
1. Click checkbox on first item to uncheck
2. Verify first item no longer has 'completed' class

**Expected Results:**
- First item no strikethrough
- Second item remains unchanged
- localStorage shows 0 completed items

**Status:** ✅ Automated

---

### TC-010: Edit Todo Item
**Objective:** Verify user can edit existing todo items  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Double-click on second todo item
2. Edit input appears with current value
3. Change text to "buy some sausages"
4. Press Enter

**Expected Results:**
- Item enters edit mode on double-click
- Edit input shows current value
- Text updates to new value
- Item exits edit mode
- localStorage reflects new value

**Test Data:**
- Original: "feed the cat"
- Updated: "buy some sausages"

**Status:** ✅ Automated

---

## 4. Editing Test Suite

### TC-011: Hide Controls When Editing
**Objective:** Verify checkbox and label are hidden during edit  
**Priority:** Medium  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Double-click on second item
2. Verify checkbox is not visible
3. Verify label is not visible

**Expected Results:**
- Checkbox hidden during edit
- Label hidden during edit
- Only edit input visible

**Status:** ✅ Automated

---

### TC-012: Save Edits on Blur
**Objective:** Verify edits are saved when input loses focus  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Double-click second item
2. Change text to "buy some sausages"
3. Trigger blur event (click outside)

**Expected Results:**
- Changes are saved
- Edit mode exits
- New text is displayed
- localStorage updated

**Status:** ✅ Automated

---

### TC-013: Trim Entered Text
**Objective:** Verify leading/trailing spaces are trimmed  
**Priority:** Medium  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Double-click second item
2. Enter "    buy some sausages    " (with spaces)
3. Press Enter

**Expected Results:**
- Spaces are trimmed
- Text saved as "buy some sausages"
- No leading or trailing spaces

**Status:** ✅ Automated

---

### TC-014: Remove Item with Empty Text
**Objective:** Verify item is deleted if edited to empty string  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Double-click second item
2. Clear all text (empty string)
3. Press Enter

**Expected Results:**
- Item is removed from list
- Only 2 items remain
- Remaining items maintain order

**Expected Items After:**
- "buy some cheese"
- "book a doctors appointment"

**Status:** ✅ Automated

---

### TC-015: Cancel Edits on Escape
**Objective:** Verify edits are cancelled when Escape is pressed  
**Priority:** Medium  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Double-click second item
2. Change text to "buy some sausages"
3. Press Escape key

**Expected Results:**
- Changes are discarded
- Original text remains
- Edit mode exits
- Item shows original value

**Status:** ✅ Automated

---

## 5. Counter Test Suite

### TC-016: Display Current Number of Active Items
**Objective:** Verify counter displays correct number of active todos  
**Priority:** High  
**Preconditions:** Navigate to Todo MVC application

**Test Steps:**
1. Add first todo item
2. Verify counter shows "1 item left"
3. Add second todo item
4. Verify counter shows "2 items left"

**Expected Results:**
- Counter updates dynamically
- Shows correct count
- Uses singular "item" for 1
- Uses plural "items" for 2+

**Status:** ✅ Automated

---

## 6. Clear Completed Button Test Suite

### TC-017: Display Clear Completed Button
**Objective:** Verify button appears when items are completed  
**Priority:** Medium  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Mark first item as complete
2. Verify "Clear completed" button is visible

**Expected Results:**
- Button appears
- Button text is "Clear completed"
- Button is clickable

**Status:** ✅ Automated

---

### TC-018: Remove Completed Items
**Objective:** Verify completed items are removed when button clicked  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items

**Test Steps:**
1. Mark second item as complete
2. Click "Clear completed" button
3. Verify only 2 items remain

**Expected Results:**
- Completed item is removed
- Active items remain
- Item count: 2
- Remaining items: cheese, appointment

**Status:** ✅ Automated

---

### TC-019: Hide Button When No Completed Items
**Objective:** Verify button hides when no completed items exist  
**Priority:** Low  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items
- Mark one item as complete

**Test Steps:**
1. Click "Clear completed" button
2. Verify button is no longer visible

**Expected Results:**
- Button disappears
- No completed items remain
- Only active items shown

**Status:** ✅ Automated

---

## 7. Persistence Test Suite

### TC-020: Persist Data Across Page Reload
**Objective:** Verify todo data persists after page reload  
**Priority:** Critical  
**Preconditions:** Navigate to Todo MVC application

**Test Steps:**
1. Add "buy some cheese"
2. Add "feed the cat"
3. Mark first item as complete
4. Reload page
5. Verify items and states persist

**Expected Results:**
- Both items still visible
- First item still completed
- Second item still active
- localStorage data intact
- Completed class maintained

**Status:** ✅ Automated

---

## 8. Routing/Filtering Test Suite

### TC-021: Display Active Items Only
**Objective:** Verify "Active" filter shows only uncompleted items  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items
- Mark second item as complete

**Test Steps:**
1. Click "Active" link
2. Verify only 2 items displayed

**Expected Results:**
- Only active items shown
- Completed items hidden
- Count: 2 items
- Items: cheese, appointment

**Status:** ✅ Automated

---

### TC-022: Respect Browser Back Button
**Objective:** Verify back button navigates through filter views  
**Priority:** Medium  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items
- Mark second item as complete

**Test Steps:**
1. Click "All" filter → verify 3 items
2. Click "Active" filter → verify 2 items
3. Click "Completed" filter → verify 1 item
4. Press browser back button → verify 2 items (Active)
5. Press browser back button → verify 3 items (All)

**Expected Results:**
- Back button navigates filters correctly
- Item counts match filter
- Filter state synchronized

**Status:** ✅ Automated

---

### TC-023: Display Completed Items Only
**Objective:** Verify "Completed" filter shows only completed items  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items
- Mark second item as complete

**Test Steps:**
1. Click "Completed" link
2. Verify only 1 item displayed

**Expected Results:**
- Only completed item shown
- Active items hidden
- Count: 1 item
- Item: feed the cat

**Status:** ✅ Automated

---

### TC-024: Display All Items
**Objective:** Verify "All" filter shows all items regardless of state  
**Priority:** High  
**Preconditions:** 
- Navigate to Todo MVC application
- Add 3 todo items
- Mark second item as complete

**Test Steps:**
1. Click "Active" filter
2. Click "Completed" filter
3. Click "All" filter
4. Verify all 3 items displayed

**Expected Results:**
- All items visible
- Both active and completed shown
- Count: 3 items
- All states preserved

**Status:** ✅ Automated

---

### TC-025: Highlight Currently Applied Filter
**Objective:** Verify active filter is visually highlighted  
**Priority:** Low  
**Preconditions:** Navigate to Todo MVC application

**Test Steps:**
1. Verify "All" has 'selected' class
2. Click "Active" link
3. Verify "Active" has 'selected' class
4. Click "Completed" link
5. Verify "Completed" has 'selected' class

**Expected Results:**
- Active filter has 'selected' class
- Only one filter highlighted at a time
- Visual feedback for current filter

**Status:** ✅ Automated

---

## Test Data

### Default Todo Items
```javascript
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];
```

### Test Environment
- **Base URL:** https://demo.playwright.dev/todomvc
- **localStorage Key:** 'react-todos'
- **Browsers:** Chromium, Firefox, WebKit
- **Viewport:** 1280x720

---

## Test Execution Summary

### Coverage Metrics
- **Total Test Cases:** 25
- **Automated:** 25 (100%)
- **Manual:** 0 (0%)
- **Priority Breakdown:**
  - Critical: 1 (4%)
  - High: 16 (64%)
  - Medium: 7 (28%)
  - Low: 1 (4%)

### Test Categories
- **Functional:** 22 (88%)
- **UI/UX:** 2 (8%)
- **Persistence:** 1 (4%)

### Risk Assessment
- **High Risk Areas:** 
  - Data persistence (TC-020)
  - Multiple item operations (TC-005, TC-006)
  - Edit functionality (TC-010, TC-014)

- **Medium Risk Areas:**
  - Filtering/Routing (TC-021-025)
  - Counter accuracy (TC-016)

---

## Test Automation Framework

### Page Object Structure
```
pages/
└── todoPage.ts
    ├── Locators (newTodoInput, todoItems, etc.)
    ├── Actions (addTodo, toggleTodo, etc.)
    └── Assertions (expectTodoCount, etc.)
```

### Fixtures
```
fixtures/
└── todo-fixtures.ts
    └── TodoPage with auto-navigation
```

### Test Organization
```
tests/
└── demo-todo-app.spec.ts
    ├── New Todo (3 tests)
    ├── Mark all as completed (3 tests)
    ├── Item (3 tests)
    ├── Editing (5 tests)
    ├── Counter (1 test)
    ├── Clear completed button (3 tests)
    ├── Persistence (1 test)
    └── Routing (6 tests)
```

---

## Traceability Matrix

| Requirement | Test Cases | Status |
|-------------|-----------|--------|
| Add todo items | TC-001, TC-002, TC-003, TC-004 | ✅ |
| Complete todos | TC-005, TC-006, TC-007, TC-008, TC-009 | ✅ |
| Edit todos | TC-010, TC-011, TC-012, TC-013, TC-014, TC-015 | ✅ |
| Counter display | TC-016 | ✅ |
| Clear completed | TC-017, TC-018, TC-019 | ✅ |
| Data persistence | TC-020 | ✅ |
| Filtering | TC-021, TC-022, TC-023, TC-024, TC-025 | ✅ |

---

## Notes

- All tests use localStorage validation for data integrity
- Tests are independent and can run in any order
- BeforeEach hooks ensure clean state for each test
- Tests validate both UI and data layer
- Cross-browser compatibility verified

**Document Version:** 1.0  
**Created:** December 2025  
**Format:** Markdown  
**Maintained by:** QA Team
