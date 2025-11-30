export const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
] as const;

export type TodoItem = typeof TODO_ITEMS[number];
