import cx from 'classnames';
import { ReactElement } from 'react';
import { t } from '../../../../public/locales/LocaleContext';
import { SectionProps } from '../data/section';
import Eyebrow from './Eyebrow';

interface Props {
  section: SectionProps;
  className?: string;
  // onClick?: (e: Event) => void;
  link?: boolean;
}

const SectionLink = ({
  section,
  className,
  onClick,
  link,
}: Props): ReactElement => {
  const linkKey = section.handle ?? section.name;
  const href = `#${section.id}`;

  const El = link ? 'a' : 'span';

  const props = link
    ? {
        href,
        onClick: (e: Event) => {
          if (typeof onClick === 'function') {
            onClick(e);
          }

          sendSegmentTrack({
            type: EventType.LinkClicked,
            payload: {
              cta: '/business' + href,
              location: 'header',
            },
          });
        },
      }
    : {};

  return (
    <El
      {...props}
      className={cx(className, 'h-10 max-w-full', 'inline-flex items-center')}
    >
      {/* add ellipsis for long words that break the screen */}
      <Eyebrow small className={cx('w-full overflow-ellipsis overflow-hidden')}>
        {t(linkKey)}
      </Eyebrow>
    </El>
  );
};

export default SectionLink;
