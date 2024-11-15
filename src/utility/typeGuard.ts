export const isNill = <T>(value: T | null | undefined): value is null | undefined => {
  return value === null || value === undefined;
};

export const isNotNill = <T>(value: T | null | undefined): value is T => {
  return !isNill(value);
};
