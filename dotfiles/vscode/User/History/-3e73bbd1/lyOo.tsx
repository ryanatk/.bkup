import cx from 'classnames';
import Link from 'next/link';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { SectionProps } from '../data/section';
import Eyebrow from './Eyebrow';

interface Props {
  section: SectionProps;
  className?: string;
  onClick?: () => void;
  noLink?: boolean;
}

const SectionLink = ({
  section,
  className,
  onClick,
  noLink,
}: Props): ReactElement => {
  const El = noLink ? 'span' : 'a';
  const href = `/business#${section.id}`;
  const props = noLink
    ? {}
    : {
        // href,
        // passHref: true,
        onClick: () => {
          if (typeof onClick === 'function') {
            onClick();
          }

          sendSegmentTrack({
            type: EventType.LinkClicked,
            payload: {
              cta: '/business' + href,
              location: 'header',
            },
          });
        },
      };

  return (
    <Link href={href} passHref>
      <El
        {...props}
        className={cx(className, 'h-12 max-w-full', 'inline-flex items-center')}
      >
        {/* add ellipsis for long words that break the screen */}
        <Eyebrow
          small
          className={cx('w-full overflow-ellipsis overflow-hidden')}
        >
          {t(section.handle ?? section.name)}
        </Eyebrow>
      </El>
    </Link>
  );
};

export default SectionLink;
