export function valueOrDefault<T>(value: T | null, defaultValue: T): T {
  if (!value) {
    return defaultValue;
  }
  return value;
}
