import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

// Get BASE_URL from environment variable
export const BASE_URL = process.env.BASE_URL || 'https://demo.playwright.dev/todomvc';
