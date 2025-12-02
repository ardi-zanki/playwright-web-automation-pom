/**
 * Format date to readable string
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }
  
  /**
   * Get current timestamp
   */
  export function getCurrentTimestamp(): string {
    return formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
  }
  
  /**
   * Get date for N days ago/ahead
   */
  export function getDateOffset(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
  
  /**
   * Get tomorrow's date
   */
  export function getTomorrow(): Date {
    return getDateOffset(1);
  }
  
  /**
   * Get yesterday's date
   */
  export function getYesterday(): Date {
    return getDateOffset(-1);
  }
  
  /**
   * Check if date is today
   */
  export function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }
  
  /**
   * Get difference in days between two dates
   */
  export function getDaysDifference(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((date1.getTime() - date2.getTime()) / oneDay);
  }
  
  /**
   * Generate date string for todo item
   */
  export function generateDateTodo(daysOffset: number = 0): string {
    const date = getDateOffset(daysOffset);
    const dateStr = formatDate(date, 'YYYY-MM-DD');
    return `Task scheduled for ${dateStr}`;
  }
  