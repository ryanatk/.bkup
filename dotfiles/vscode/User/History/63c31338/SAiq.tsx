import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { MessageKey } from '../../../../public/locales/setup';
import { Typography } from '../../../sormus';
import tx from './tx';

// List item marker
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
  values?: Record<string, ReactNode>;
}

const Item = ({
  marker = 'disc',
  tx: text,
  children,
  className,
  values = {},
}: Props): ReactElement => {
  const { classNames } = MARKER[marker];

  return (
    <Typography Element="li" className={cx('ml-4 pl-4', classNames, className)}>
      {text && tx(text, values)}

      {/* Reset Typograpy for nested children */}
      {children && <Typography>{children}</Typography>}
    </Typography>
  );
};

export default Item;
