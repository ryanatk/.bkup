import { ReactElement } from 'react';
import SectionsAccordion from './SectionsAccordion';

/* TODO:
    - imports the new hooks
    - handles the states
    - imports SectionsAccordion
*/

const SectionsMenu = ({ open, setOpen }): ReactElement => {
  return (
    <>
      <SectionsAccordion open={open} setOpen={setOpen} />
    </>
  );
};

export default SectionsMenu;
