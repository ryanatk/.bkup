import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { Typography } from '../../../components/sormus';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

/**
 * Represents legal section/article/sub-section references
 * in the document's hierarchy ()
 */
type MarkerType = 'disc' | 'circle';

const MARKER: {
  [x in MarkerType]: {
    classNames: string[];
  };
} = {
  disc: { classNames: ['list-disc'] },
  circle: { classNames: ['list-circle'] },
};

interface Props {
  marker?: MarkerType;
  tx?: MessageKey; // TODO
  children?: ReactNode;
  className?: string;
}

const Item = ({
  marker = 'disc',
  tx: text,
  children,
  className,
}: Props): ReactElement => {
  const { classNames } = MARKER[marker];

  return (
    <Typography
      Element="li"
      className={cx('list-inside', classNames, className)}
    >
      {text && tx(text)}

      {/* Reset Typograpy for nested children */}
      {children && <Typography>{children}</Typography>}
    </Typography>
  );
};

export default Item;
