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
type MarkerType = 'I' | 'A' | 'i' | 'disc' | 'circle';

const MARKER: {
  [x in MarkerType]: {
    isHeading?: boolean;
    Element?: TypographyElement;
    variant?: TypographyVariant;
    classNames: string[];
  };
} = {
  I: {
    isHeading: true,
    Element: 'h2',
    variant: 'h3',
    classNames: ['uppercase', 'list-upper-roman', 'ml-24'],
  },
  A: {
    isHeading: true,
    Element: 'h3',
    variant: 'h4',
    classNames: ['uppercase', 'list-upper-alpha', 'ml-16'],
  },
  i: {
    isHeading: true,
    Element: 'h4',
    variant: 'h5',
    classNames: ['uppercase', 'list-lower-roman'],
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

const Heading = ({
  level = 'disc',
  tx: text,
  children,
  className,
  ...rest
}: ItemProps): ReactElement => {
  const { isHeading, Element, variant, classNames } = MARKER[level];

  return (
    <Typography
      className="list-item"
      Element={Element}
      variant={variant}
      {...rest}
    >
      {tx(text)}
    </Typography>
  );
};

export default Heading;
