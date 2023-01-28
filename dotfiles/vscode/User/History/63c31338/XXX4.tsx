import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import { Typography } from '../../../components/sormus';
import {
  TypographyElement,
  TypographyVariant,
} from '../../../components/sormus/Typography';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

/**
 * Represents legal section/article/sub-section references
 * in the document's hierarchy ()
 */
type MarkerType = 'I' | 'A' | 'i' | 'a' | 'disc' | 'circle';

const MARKER: {
  [x in MarkerType]: {
    Element?: TypographyElement;
    variant?: TypographyVariant;
    classNames: string[];
  };
} = {
  I: {
    Element: 'h2',
    variant: 'h2',
    classNames: ['uppercase', 'list-upper-roman', 'ml-24'],
  },
  A: {
    Element: 'h3',
    variant: 'h3',
    classNames: ['uppercase', 'list-upper-alpha'],
  },
  i: {
    Element: 'h4',
    variant: 'h4',
    classNames: ['uppercase', 'list-lower-roman'],
  },
  a: {
    Element: 'h5',
    variant: 'h5',
    classNames: ['uppercase', 'list-lower-alpha'],
  },
  disc: { classNames: ['list-disc'] },
  circle: { classNames: ['list-circle'] },
};

interface ItemProps {
  level?: MarkerType;
  tx?: MessageKey; // TODO
  children?: ReactNode;
  className?: string;
}

const Item = ({
  level = 'disc',
  tx: text,
  children,
  className,
  ...rest
}: ItemProps): ReactElement => {
  const { Element, variant, classNames } = MARKER[level];

  return (
    <Typography
      Element="li"
      variant={variant}
      className={cx(classNames, className)}
    >
      {text && (
        <Typography Element={Element} variant={variant} {...rest}>
          {tx(text)}
        </Typography>
      )}

      {/* Reset Typograpy for nested children */}
      {children && <Typography className="normal-case">{children}</Typography>}
    </Typography>
  );
};

export default Item;
