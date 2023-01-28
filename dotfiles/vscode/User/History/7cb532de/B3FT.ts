/**
 * Traverse the menu with keyboard.
 */

import { KeyboardEvent, MutableRefObject, useEffect, useRef } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const focusedLinkIndex = useRef<number>(-1);

  // const handleKeyup = useCallback(
  //   (evt: KeyboardEvent) => {
  //     if (isCaptured) {
  //       traverseMenu(evt.key, () => evt.preventDefault(), {
  //         menu: menuRef.current,
  //         menuTrigger: menuTriggerRef.current,
  //         currentIndex: focusedLinkIndex.current,
  //         onTraverse: (index: number) => (focusedLinkIndex.current = index),
  //         onEscape,
  //       });
  //     } else {
  //       // Reset focused link index on menu close
  //       if (focusedLinkIndex.current !== -1) {
  //         focusedLinkIndex.current = -1;
  //       }
  //     }
  //   },
  //   [isCaptured, onEscape],
  // );

  // const handleKeydown = useCallback(
  //   (evt: KeyboardEvent): void => {
  //     if (isCaptured) {
  //       preventScrolling(evt.key, () => evt.preventDefault());
  //     }
  //   },
  //   [isCaptured],
  // );

  useEffect(() => {
    const handleKeyup = (evt: KeyboardEvent) => {
      if (isCaptured) {
        traverseMenu(evt.key, () => evt.preventDefault(), {
          menu: menuRef.current,
          menuTrigger: menuTriggerRef.current,
          currentIndex: focusedLinkIndex.current,
          onTraverse: (index: number) => (focusedLinkIndex.current = index),
          onEscape,
        });
      } else {
        // Reset focused link index on menu close
        if (focusedLinkIndex.current !== -1) {
          focusedLinkIndex.current = -1;
        }
      }
    };

    const handleKeydown = (evt: KeyboardEvent): void => {
      if (isCaptured) {
        preventScrolling(evt);
      }
    };

    document.body.addEventListener('keydown', handleKeydown);
    document.body.addEventListener('keyup', handleKeyup);

    return () => {
      document.body.removeEventListener('keydown', handleKeydown);
      document.body.removeEventListener('keyup', handleKeyup);
    };
  }, [isCaptured, onEscape]);

  return {
    menuRef,
    menuTriggerRef,
  };
};

export default useTraverseMenu;
