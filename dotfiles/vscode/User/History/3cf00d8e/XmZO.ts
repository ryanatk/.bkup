import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import setupKeydown from '../utils/setupKeydown';
import setupKeyup from '../utils/setupKeyup';
import toggleOutsideElements from '../utils/toggleOutsideElements';
import toggleOutsideElementsTabbing from '../utils/toggleOutsideElementsTabbing';
import toggleOutsideElementsVisibility from '../utils/toggleOutsideElementsVisibility';

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
        setupKeydown(event);
      }
    },
    [isOpen, matchLargeScreen],
  );

  const handleKeyup = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && !matchLargeScreen) {
        setupKeyup({
          event,
          menu: menuRef.current,
          menuTrigger: menuTriggerRef.current,
          menuLinks: Array.from(menuRef.current.querySelectorAll('a')),
          focusedLinkIndexRef: focusedLinkIndexRef,
          onEscape: () => setIsOpen(false),
        });
      }
    },
    [
      isOpen,
      setIsOpen,
      matchLargeScreen,
      menuRef,
      menuTriggerRef,
      focusedLinkIndexRef,
    ],
  );

  useEffect(() => {
    const isOutsideVisible = !isOpen || matchLargeScreen;

    if (disabledOutsideElements.current !== isOutsideVisible) {
      toggleOutsideElements({
        visible: isOutsideVisible,
        menu: menuRef.current,
        menuTrigger: menuTriggerRef.current,
      });
      toggleOutsideElementsVisibility(
        isOutsideVisible,
        menuRef.current,
        menuTriggerRef.current,
      );
      toggleOutsideElementsTabbing(
        isOutsideVisible,
        menuRef.current,
        menuTriggerRef.current,
      );
      disabledOutsideElements.current = !isOutsideVisible;
    }
  }, [isOpen, matchLargeScreen]);

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
