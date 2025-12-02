/**
 * Generate random string with specified length
 */
export function generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  /**
   * Generate random todo item text
   */
  export function generateRandomTodo(): string {
    const actions = ['Buy', 'Book', 'Call', 'Send', 'Read', 'Write', 'Clean'];
    const items = ['groceries', 'appointment', 'friend', 'email', 'book', 'report', 'room'];
    
    const action = actions[Math.floor(Math.random() * actions.length)];
    const item = items[Math.floor(Math.random() * items.length)];
    
    return `${action} ${item}`;
  }
  
  /**
   * Wait for specified milliseconds
   */
  export async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Retry function with specified attempts
   */
  export async function retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await wait(delay);
        }
      }
    }
    
    throw lastError;
  }
  
  /**
   * Pluralize word based on count
   */
  export function pluralize(count: number, singular: string, plural?: string): string {
    if (count === 1) {
      return `${count} ${singular}`;
    }
    return `${count} ${plural || singular + 's'}`;
  }
  
  /**
   * Sanitize string for test data
   */
  export function sanitizeString(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  }
  
  /**
   * Generate array of numbers from start to end
   */
  export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  
  /**
   * Shuffle array randomly
   */
  export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  