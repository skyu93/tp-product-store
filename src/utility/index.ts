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

export const debounce = <T>(callback: (data?: T) => void, time: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (data?: T) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback(data);
    }, time);
  };
};
