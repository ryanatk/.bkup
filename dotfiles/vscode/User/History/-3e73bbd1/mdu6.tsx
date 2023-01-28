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

const Content = () => (
  <Eyebrow
    small
    // add ellipsis for long words that break the screen
    className={cx('w-full overflow-ellipsis overflow-hidden')}
  >
    {t(section.handle ?? section.name)}
  </Eyebrow>
);

const SectionLink = ({
  section,
  className,
  onClick,
  noLink,
}: Props): ReactElement => {
  const El = noLink ? 'span' : 'a';
  // const El = noLink ? 'a' : 'a';
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
      ></El>
    </Link>
  );
};

export default SectionLink;
