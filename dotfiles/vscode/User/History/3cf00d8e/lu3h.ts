import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  MENU_TRIGGER_INDEX,
  preventScrolling,
  setupToggleOutsideElements,
  setupTraverseMenu,
} from '../utils';

interface UseHeaderA11yOptions {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  matchLargeScreen: boolean;
}

interface UseHeaderA11yState {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuTriggerRef: MutableRefObject<HTMLButtonElement>;
  disabledOutsideElements: MutableRefObject<boolean>;
}

const useHeaderA11y = ({
  isOpen,
  setIsOpen,
  matchLargeScreen,
}: UseHeaderA11yOptions): UseHeaderA11yState => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const focusedLinkIndexRef = useRef<number>(MENU_TRIGGER_INDEX);
  const disabledOutsideElements = useRef<boolean>(false);

  // Prevent scrolling while menu is open
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && !matchLargeScreen) {
        preventScrolling(event);
        // Prevent scrolling via arrow keys when moving through nav links
      }
    },
    [isOpen, matchLargeScreen],
  );

  // Traverse the menu with keyboard
  const traverseMenu = setupTraverseMenu({
    menu: menuRef.current,
    menuTrigger: menuTriggerRef.current,
    onTraverse: (i) => {
      focusedLinkIndexRef.current = i;
    },
    onEscape: () => setIsOpen(false),
  });

  const handleKeyup = useCallback(
    (event) => {
      if (isOpen && !matchLargeScreen) {
        traverseMenu(event, focusedLinkIndexRef.current);
      }
    },
    [isOpen, traverseMenu, matchLargeScreen],
  );

  // Hide outside elements from screen readers
  const toggleOutsideElements = setupToggleOutsideElements(
    menuRef.current,
    menuTriggerRef.current,
    {
      tabbing: '*',
      visibility:
        'a[href], button, input, textarea, select, details, iframe, [tabindex]:not([tabindex="-1"])',
    },
  );

  useEffect(() => {
    const isOutsideHidden = isOpen && !matchLargeScreen;

    if (disabledOutsideElements.current !== isOutsideHidden) {
      toggleOutsideElements(isOutsideHidden);
      disabledOutsideElements.current = isOutsideHidden;
    }
  }, [isOpen, matchLargeScreen, toggleOutsideElements]);

  // Bind global keyboard event listeners
  useEffect(() => {
    document.body.addEventListener('keydown', handleKeydown);
    document.body.addEventListener('keyup', handleKeyup);

    return () => {
      document.body.removeEventListener('keydown', handleKeydown);
      document.body.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);

  return {
    menuRef,
    menuTriggerRef,
    disabledOutsideElements,
  };
};

export default useHeaderA11y;
