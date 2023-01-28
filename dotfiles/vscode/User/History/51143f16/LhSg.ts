import toggleElement, { Attribute } from './toggleElement';

interface Config extends Attribute {
  SELECTOR: string;
}

const CONFIGS: Config[] = [
  {
    SELECTOR: 'tabbing',
    NAME: 'tabindex',
    VALUE: '-1',
  },
  {
    SELECTOR: 'visibility',
    NAME: 'aria-hidden',
    VALUE: 'true',
  },
];

const setupToggleOutsideElements = (
  menu: HTMLElement,
  menuTrigger: HTMLElement,
  selector: {
    visibility: string;
    tabbing: string;
  },
): ((isHidden: boolean) => void) => {
  return (isHidden: boolean) => {
    CONFIGS.forEach(({ SELECTOR, ...ATTR }) => {
      const elements = document.body.querySelectorAll<HTMLElement>(
        selector[SELECTOR],
      );

      elements.forEach((element) => {
        if (
          !element?.contains(menu) && // not a parent
          !menu?.contains(element) && // not a child
          element !== menuTrigger // not the trigger
        ) {
          toggleElement(element, isHidden, ATTR);
        }
      });
    });
  };
};

export default setupToggleOutsideElements;
