import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['s', 'm', 'l', 'xl', 'xxl'] }]
    }
  }
});

export const cn = (...classNames: ClassValue[]) => {
  return customTwMerge(clsx(...classNames));
};
