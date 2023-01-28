import cx from 'classnames';
import Link from 'next/link';
import { ReactElement } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import { SectionProps } from '../data/section';
import Eyebrow from './Eyebrow';

interface Props {
  section: SectionProps;
  className?: string;
  onClick?: () => void;
  noLink?: boolean;
}

const Content = ({ messageKey }: { messageKey: MessageKey }) => (
  <Eyebrow
    small
    // add ellipsis for long words that break the screen
    className={cx('w-full overflow-ellipsis overflow-hidden')}
  >
    {t(messageKey)}
  </Eyebrow>
);

const SectionLink = ({
  section,
  className,
  onClick,
  noLink,
}: Props): ReactElement => {
  const href = `/business#${section.id}`;
  const sharedClassName = cx(
    className,
    'h-12 max-w-full',
    'inline-flex items-center',
  );

  return noLink ? (
    <span className={sharedClassName}>
      <Content messageKey={section.handle ?? section.name} />
    </span>
  ) : (
    <Link href={href} passHref>
      <a
        className={sharedClassName}
        onClick={() => {
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
        }}
      >
        <Content messageKey={section.handle ?? section.name} />
      </a>
    </Link>
  );
};

export default SectionLink;
