/**
 * Traverse the menu with keyboard.
 */

import { inRange } from 'lodash';

export const MENU_TRIGGER_INDEX = -1;

const ACTION_KEYS = {
  CLICK: ['space', ' '],
  ESCAPE: ['escape'],
  TAB: ['tab'],
  NEXT: ['down', 'arrowdown', 'right', 'arrowright'],
  PREVIOUS: ['up', 'arrowup', 'left', 'arrowleft'],
};

const KEYS = {
  SPACE: ['space', ' '],
  ESCAPE: ['escape'],
  TAB: ['tab'],
  NEXT: ['down', 'arrowdown', 'right', 'arrowright'],
  PREVIOUS: ['up', 'arrowup', 'left', 'arrowleft'],
};

export const ACTION = {
  CLICK: 'click',
  ESCAPE: 'escape',
  NEXT: 'next',
  PREVIOUS: 'previous',
  TAB: 'tab',
};

export const KEY = {
  escape: ACTION.ESCAPE,
  space: ACTION.CLICK,
  ' ': ACTION.CLICK,
  tab: ACTION.TAB,
  down: ACTION.NEXT,
  arrowdown: ACTION.NEXT,
  right: ACTION.NEXT,
  arrowright: ACTION.NEXT,
  up: ACTION.PREVIOUS,
  arrowup: ACTION.PREVIOUS,
  left: ACTION.PREVIOUS,
  arrowleft: ACTION.PREVIOUS,
};

export const getMenuLinks = (menu) =>
  menu ? Array.from(menu.querySelectorAll('a')) : [];

interface MenuProps {
  menu: HTMLElement;
  menuTrigger: HTMLElement;
  // menuLinks: HTMLElement[];
  currentIndex: number;
  onTraverse: (index: number) => void;
  onEscape: () => void;
}

const traverseMenu = (
  event: KeyboardEvent,
  {
    menu,
    menuTrigger,
    // menuLinks,
    currentIndex,
    onTraverse,
    onEscape,
  }: MenuProps,
): Element => {
  // console.log({ key: event.key });
  const activeElement = document.activeElement;
  const isMenuFocused = menu.contains(activeElement);
  const isTriggerFocused = activeElement === menuTrigger;
  const menuLinks = getMenuLinks(menu);

  if (!isMenuFocused && !isTriggerFocused) {
    if (typeof onEscape === 'function') {
      onEscape();
    }

    return null;
  }

  const handleTraverse = (index: number) => {
    // console.log({ index });
    onTraverse(index);
  };

  // helper fn containing traversal & focus logic
  const updateFocus = (index: number) => {
    const el = index === MENU_TRIGGER_INDEX ? menuTrigger : menuLinks[index];
    el?.focus();
    return el;
  };

  switch (KEY[event.key.toLowerCase()]) {
    // Close menu when esc is pressed while it's open and re-focus on the trigger
    case ACTION.ESCAPE: {
      if (typeof onEscape === 'function') {
        onEscape();
      }

      handleTraverse(MENU_TRIGGER_INDEX);
      return updateFocus(MENU_TRIGGER_INDEX);
    }

    // Re-implement "space" for buttons (in case we prevent scrolling)
    case ACTION.CLICK: {
      event.preventDefault();
      const target = event.target as Element;
      console.log({ target, activeElement });

      if (target.tagName === 'BUTTON') {
        (target as HTMLButtonElement).click();
      }

      return target;
    }

    // Keep focusedLinkIndexRef in sync with links focused via tabbing
    case ACTION.TAB: {
      if (isMenuFocused || isTriggerFocused) {
        if (isTriggerFocused) {
          handleTraverse(MENU_TRIGGER_INDEX);
        } else {
          // when using "tab" key, don't trap user in the menu
          handleTraverse(menuLinks.indexOf(activeElement as HTMLAnchorElement));
        }
      }

      return activeElement;
    }

    // Traverse links from top to bottom
    case ACTION.NEXT: {
      event.preventDefault();
      const newIndex = currentIndex + 1;

      // when using "arrow" keys, trap user in the menu
      if (inRange(newIndex, menuLinks.length)) {
        const newIndex = currentIndex + 1;

        handleTraverse(newIndex);
        return updateFocus(newIndex);
      } else {
        return activeElement;
      }
    }

    // Traverse links from bottom to top
    case ACTION.PREVIOUS: {
      event.preventDefault();
      const newIndex = currentIndex - 1;

      // when using "arrow" keys, trap user in the menu
      if (inRange(newIndex, menuLinks.length)) {
        handleTraverse(newIndex);
        return updateFocus(newIndex);
      } else {
        return activeElement;
      }
    }

    default: {
      return null;
    }
  }
};

export default traverseMenu;
