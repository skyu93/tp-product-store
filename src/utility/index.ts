const LARGE_SCREEN_WIDTH = 1200;
const MEDIUM_SCREEN_MIN_WIDTH = 768;
const MEDIUM_SCREEN_MAX_WIDTH = 1119;

export const getResponsiveColumnWidth = (width: number) => {
  if (width >= LARGE_SCREEN_WIDTH) {
    return Math.trunc(width / 4);
  } else if (width >= MEDIUM_SCREEN_MIN_WIDTH && width <= MEDIUM_SCREEN_MAX_WIDTH) {
    return Math.trunc(width / 3);
  }

  return Math.trunc(width / 2);
};
