/**
 * Temporary shims and utilities for dashboard until full shadcn/ui parity is added.
 * - Exports a typed mutable array helper for Recharts datasets if needed elsewhere
 */

/**
 * Ensures arrays are mutable (useful for libraries requiring mutable arrays).
 */
export function toMutableArray<T>(arr: ReadonlyArray<T>): T[] {
  return Array.isArray(arr) ? [...arr] : Array.from(arr)
}