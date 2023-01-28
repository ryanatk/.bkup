/**
 * Traverse the menu with keyboard.
 */

import {
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import preventScrolling from './preventScrolling';
import traverseMenu from './traverseMenu';

export const MENU_TRIGGER_INDEX = -1;

interface TraverseMenu {
  onEscape: () => void;
  isCaptured: boolean;
}

interface MenuState {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuTriggerRef: MutableRefObject<HTMLButtonElement>;
}

const useTraverseMenu = ({ isCaptured, onEscape }: TraverseMenu): MenuState => {
  const menu = useRef<HTMLDivElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const focusedLinkIndex = useRef<number>(-1);

  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      if (isCaptured) {
        traverseMenu(e, {
          menu: menu.current,
          menuTrigger: menuTrigger.current,
          menuLinks: menu.current
            ? Array.from(menu.current.querySelectorAll('a'))
            : [],
          currentIndex: focusedLinkIndex.current,
          onTraverse: (index: number) => (focusedLinkIndex.current = index),
          onEscape,
          //   handleTraverse,
          //   updateFocus,
        });
      }
    },
    [isCaptured, menu, menuTrigger, onEscape],
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent): void => {
      if (isCaptured) {
        preventScrolling(event);
      }
    },
    [isCaptured],
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeydown);
    document.body.addEventListener('keyup', handleKeyup);

    return () => {
      document.body.removeEventListener('keydown', handleKeydown);
      document.body.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);

  return {
    menuRef: menu,
    menuTriggerRef: menuTrigger,
  };
};

export default useTraverseMenu;
