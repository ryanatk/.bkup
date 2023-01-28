/**
 * Toggle visibility & tabbing of outside elements,
 * hiding them from screen readers
 *
 * Setup function accepts initial config,
 * returning a function to toggle on & off.
 */

import toggleElementAttr, { Attr } from './toggleElementAttr';

interface Config extends Attr {
  SELECTOR: string;
}

const CONFIGS: Config[] = [
  {
    NAME: 'tabindex',
    VALUE: '-1',
    SELECTOR:
      'a[href], button, input, textarea, select, details, iframe, [tabindex]',
  },
  {
    NAME: 'aria-hidden',
    VALUE: 'true',
    SELECTOR: '*',
  },
];

const setupToggleOutsideElements = (
  menu: HTMLElement,
  menuTrigger: HTMLElement,
  optionalLabel?: string,
): ((isHidden: boolean) => void) => {
  return (isHidden: boolean) => {
    CONFIGS.forEach(({ SELECTOR, ...ATTR }) => {
      const elements = document.body.querySelectorAll<HTMLElement>(
        SELECTOR.split(',').join(','),
      );

      elements.forEach((element) => {
        if (
          !element?.contains(menu) && // not a parent
          !menu?.contains(element) && // not a child
          element !== menuTrigger // not the trigger
        ) {
          toggleElementAttr(element, isHidden, ATTR, optionalLabel);
        }
      });
    });
  };
};

export default setupToggleOutsideElements;
