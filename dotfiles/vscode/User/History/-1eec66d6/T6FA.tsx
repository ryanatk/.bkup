import { KeyboardArrowDown } from '@material-ui/icons';
import cx from 'classnames';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import useTraverseMenu from '../../../../hooks/useTraverseMenu';
import { Grid } from '../../../sormus';
import { MAIN_CONTENT_ID } from '../../../sormus/MainContent';
import SectionLink from './SectionLink';
import SectionsList from './SectionsList';

const HEADING_LABEL = 'business_section_handle_main';
const LIST_ID = 'business-sections-accordion-list';

export interface AccordionProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SectionsAccordion = ({ open, setOpen }: AccordionProps): ReactElement => {
  const { menuRef, menuTriggerRef } = useTraverseMenu({
    isCaptured: open,
    onEscape: () => setOpen(false),
  });

  const handleToggle = () => {
    setOpen((isOpen: boolean) => !isOpen);
  };

  return (
    <div className="relative border-t border-gray-200">
      <Grid>
        <div className="col-main" ref={menuRef}>
          <span className="flex justify-between items-center w-full relative">
            <button
              onClick={handleToggle}
              aria-controls={LIST_ID}
              ref={menuTriggerRef}
              className={cx('absolute text-right right-0', {
                'w-full': !open, // covers the whole area
              })}
              style={{ zIndex: 2 }} // sit atop the "overview" link
            >
              <KeyboardArrowDown
                className={cx(
                  'text-inherit',
                  'transition-transform transform',
                  {
                    'rotate-180': open,
                  },
                )}
              />
            </button>

            <SectionLink
              section={{
                name: HEADING_LABEL,
                id: MAIN_CONTENT_ID,
              }}
              noFocus={!open}
              style={{ zIndex: 1 }} // keep the focus outline from being overlapped
            />
          </span>

          <Grid
            id={LIST_ID}
            aria-hidden={!open}
            className={cx('absolute top-full left-0 right-0 bg-white', {
              visible: open,
              invisible: !open,
            })}
          >
            <SectionsList
              className="col-main"
              itemClassName="w-full border-t border-gray-200"
            />
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default SectionsAccordion;
