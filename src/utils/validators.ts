export const isEmail = (s: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(s);
export const minLen = (s: string, n: number) => (s?.length ?? 0) >= n;
export type FieldError = string | null;