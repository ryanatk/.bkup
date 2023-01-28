import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import useTraverseMenu from '../../../../hooks/useTraverseMenu';
import { breakpoints } from '../../../sormus/constants';

interface UseAccordionOptions {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface UseAccordionState {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuTriggerRef: MutableRefObject<HTMLButtonElement>;
}

const useAccordion = ({
  isOpen,
  setIsOpen,
}: UseAccordionOptions): UseAccordionState => {
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const { handleKeydown, handleKeyup } = useTraverseMenu({
    menu: menuRef.current,
    menuTrigger: menuTriggerRef.current,

    isCaptured: isOpen && !isLargeScreen,
    onEscape: () => setIsOpen(false),
  });

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
  };
};

export default useAccordion;
