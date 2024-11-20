const PC = 1200;
const TABLET = 768;

const getColumnsCount = (width: number): number => {
  if (width >= PC) return 4;
  if (width >= TABLET) return 3;
  return 2;
};

export const getResponsiveColumnWidth = (width: number) => {
  return Math.trunc(width / getColumnsCount(width));
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

export const throttle = <T>(callback: (data?: T) => void, time: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (data?: T) => {
    if (timeout) return;

    timeout = setTimeout(() => {
      callback(data);
      timeout = null;
    }, time);
  };
};
