import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  onKeydown,
  setupKeyup,
  setupToggleOutsideElements,
} from '../../../sormus/Header/utils';

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
  const focusedLinkIndexRef = useRef<number>(-1);
  const disabledOutsideElements = useRef<boolean>(false);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && !matchLargeScreen) {
        onKeydown(event);
      }
    },
    [isOpen, matchLargeScreen],
  );

  const onKeyup = setupKeyup({
    menu: menuRef.current,
    menuTrigger: menuTriggerRef.current,
    focusedLinkIndexRef,
    onEscape: () => setIsOpen(false),
  });

  const handleKeyup = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && !matchLargeScreen) {
        onKeyup(event);
      }
    },
    [isOpen, onKeyup, matchLargeScreen],
  );

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
