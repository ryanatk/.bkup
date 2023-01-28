import { ReactElement, useState } from 'react';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { breakpoints } from '../../../sormus/constants';
import { useAccordionA11y } from '../hooks';
import SectionsAccordion, { AccordionProps } from './SectionsAccordion';

/* TODO:
    - imports the new hooks
    - handles the states
    - imports SectionsAccordion
*/

// interface Props extends AccordionProps {}

const SectionsMenu = ({ open, setOpen }: AccordionProps): ReactElement => {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);

  const { menuRef, menuTriggerRef } = useAccordionA11y({
    isOpen: offcanvasOpen,
    setIsOpen: setOffcanvasOpen,
    matchLargeScreen: isLargeScreen,
  });

  return (
    <>
      <SectionsAccordion
        open={open}
        setOpen={setOpen}
        menuRef={menuRef}
        menuTriggerRef={menuTriggerRef}
      />
    </>
  );
};

export default SectionsMenu;