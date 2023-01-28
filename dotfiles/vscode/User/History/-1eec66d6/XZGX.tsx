import { KeyboardArrowDown } from '@material-ui/icons';
import cx from 'classnames';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { Grid } from '../../../sormus';
import { breakpoints } from '../../../sormus/constants';
import { MAIN_CONTENT_ID } from '../../../sormus/MainContent';
import { useAccordionA11y } from '../hooks';
import SectionLink from './SectionLink';
import SectionsList from './SectionsList';

const HEADING_LABEL = 'business_section_handle_main';
const LIST_ID = 'business-sections-accordion-list';

interface AccordionProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SectionsAccordion = ({ open, setOpen }: AccordionProps): ReactElement => {
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);

  const { menuRef, menuTriggerRef } = useAccordionA11y({
    isOpen: open,
    setIsOpen: setOpen,
    matchLargeScreen: isLargeScreen,
  });

  const HeadingEl = open ? 'span' : 'button';
  const ArrowEl = open ? 'button' : 'span';

  const handleToggle = () => {
    setOpen((isOpen: boolean) => !isOpen);
  };

  return (
    <div className="relative border-t border-gray-200">
      <Grid>
        <div className="col-main" ref={menuRef}>
          <HeadingEl
            className="flex justify-between items-center w-full"
            onClick={open ? null : handleToggle}
            ref={open ? null : menuTriggerRef}
          >
            <SectionLink
              section={{
                name: HEADING_LABEL,
                id: MAIN_CONTENT_ID,
              }}
              noLink={!open}
            />

            <ArrowEl
              onClick={open ? handleToggle : null}
              aria-controls={LIST_ID}
              ref={open ? menuTriggerRef : null}
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
            </ArrowEl>
          </HeadingEl>

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
