import { ReactElement } from 'react';
import SectionsAccordion, { AccordionProps } from './SectionsAccordion';

/* TODO:
    - imports the new hooks
    - handles the states
    - imports SectionsAccordion
*/

// interface Props extends AccordionProps {}

const SectionsMenu = ({ open, setOpen }: AccordionProps): ReactElement => {
  return (
    <>
      <SectionsAccordion open={open} setOpen={setOpen} />
    </>
  );
};

export default SectionsMenu;
