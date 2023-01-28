import { inRange } from 'lodash';
import { KeyboardEvent } from 'react';

export const TRIGGER_INDEX = -1;

interface SetupElements {
  menu: HTMLElement;
  menuTrigger: HTMLElement;
  onTraverse: (index: number) => void;
  onEscape: () => void;
}

const setupKeyup = ({
  menu,
  menuTrigger,
  onTraverse,
  onEscape,
}: SetupElements): ((e: KeyboardEvent, i: number) => void) => {
  const menuLinks: HTMLElement[] = menu
    ? Array.from(menu.querySelectorAll('a'))
    : [];

  // helper fn containing traversal & focus logic
  const handleTraverse = (index: number) => {
    if (inRange(index, menuLinks.length)) {
      onTraverse(index);
      menuLinks[index].focus();
    } else if (index === TRIGGER_INDEX) {
      onTraverse(TRIGGER_INDEX);
      menuTrigger.focus();
    }
  };

  return (event: KeyboardEvent, currentIndex: number): void => {
    const { key } = event;

    switch (key.toLowerCase()) {
      // Close menu when esc is pressed while it's open and re-focus on the trigger
      case 'escape': {
        if (typeof onEscape === 'function') {
          onEscape();
        }

        menuTrigger.focus();
        break;
      }

      // Keep focusedLinkIndexRef in sync with links focused via tabbing
      case 'tab': {
        if (
          menu.contains(document.activeElement) ||
          document.activeElement === menuTrigger
        ) {
          if (document.activeElement === menuTrigger) {
            handleTraverse(TRIGGER_INDEX);
          } else {
            handleTraverse(
              menuLinks.indexOf(document.activeElement as HTMLAnchorElement),
            );
          }
        }

        break;
      }

      // Traverse links from top to bottom
      case 'arrowdown':
      case 'arrowright': {
        event.preventDefault();

        if (document.activeElement === menuTrigger) {
          handleTraverse(0);
        } else {
          handleTraverse(currentIndex + 1);
        }

        break;
      }

      // Traverse links from bottom to top
      case 'arrowup':
      case 'arrowleft': {
        event.preventDefault();
        handleTraverse(currentIndex - 1);
        break;
      }
    }
  };
};

export default setupKeyup;
