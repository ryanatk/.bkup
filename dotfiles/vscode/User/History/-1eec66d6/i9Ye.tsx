import { KeyboardArrowDown } from '@material-ui/icons';
import cx from 'classnames';
import React, {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
} from 'react';
import { Grid } from '../../../sormus';
import { MAIN_CONTENT_ID } from '../../../sormus/MainContent';
import SectionLink from './SectionLink';
import SectionsList from './SectionsList';

const HEADING_LABEL = 'business_section_handle_main';
const LIST_ID = 'business-sections-accordion-list';

export interface MenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface AccordionProps extends MenuProps {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuTriggerRef: MutableRefObject<HTMLButtonElement>;
}

const SectionsAccordion = ({
  open,
  setOpen,
  menuRef,
  menuTriggerRef,
}: AccordionProps): ReactElement => {
  const HeadingEl = open ? 'span' : 'button';
  const ArrowEl = open ? 'button' : 'span';

  const handleToggle = () => {
    setOpen((isOpen: boolean) => !isOpen);
  };

  return (
    <div className="relative border-t border-gray-200">
      <Grid>
        <div className="col-main">
          <HeadingEl
            className="flex justify-between items-center w-full"
            onClick={open ? null : handleToggle}
            ref={menuTriggerRef}
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
            {/* <div ref={menuRef}> */}
            <SectionsList
              className="col-main"
              itemClassName="w-full border-t border-gray-200"
            />
            {/* </div> */}
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default SectionsAccordion;
