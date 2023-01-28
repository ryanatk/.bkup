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

const Content = ({ text }: { text: MessageKey }) => (
  <Eyebrow
    small
    // add ellipsis for long words that break the screen
    className={cx('w-full overflow-ellipsis overflow-hidden')}
  >
    {t(text)}
  </Eyebrow>
);

const SectionLink = ({
  section,
  className,
  onClick,
  noLink,
  ...props
}: Props): ReactElement => {
  const href = `/business#${section.id}`;
  const sharedClassName = cx(
    className,
    'h-12 max-w-full',
    'inline-flex items-center',
  );
  const text = section.handle ?? section.name;

  return (
    <Link href={href} passHref>
      <a
        {...props}
        tabIndex={noLink ? -1 : 0}
        href="/" // to appease the linter (href is passed in from Link)
        className={sharedClassName}
        onClick={() => {
          if (typeof onClick === 'function') {
            onClick();
          }

          sendSegmentTrack({
            type: EventType.LinkClicked,
            payload: {
              cta: href,
              location: 'header',
            },
          });
        }}
      >
        <Content text={text} />
      </a>
    </Link>
  );
};

export default SectionLink;
