import { ReactElement, ReactNode } from 'react';
import { Typography } from '../../../components/sormus';
import {
  TypographyElement,
  TypographyVariant,
} from '../../../components/sormus/Typography';
// import { MessageKey } from '../../../public/locales/setup';
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
    style: {
      [x: string]: string;
    };
  };
} = {
  I: { Element: 'h2', variant: 'h2', style: { listStyleType: 'upper-roman' } },
  A: { Element: 'h3', variant: 'h3', style: { listStyleType: 'upper-alpha' } },
  i: { Element: 'h4', variant: 'h4', style: { listStyleType: 'lower-roman' } },
  a: { Element: 'h5', variant: 'h5', style: { listStyleType: 'lower-alpha' } },
  disc: { style: { listStyleType: 'disc' } },
  circle: { style: { listStyleType: 'circle' } },
};

interface ItemProps {
  mark?: MarkerType;
  text?: string;
  // text?: MessageKey; // TODO
  children?: ReactNode;
  className?: string;
}

const Item = ({
  mark = 'disc',
  text,
  children,
  className,
  ...rest
}: ItemProps): ReactElement => {
  const { Element, variant, style } = MARKER[mark];

  return (
    <Typography
      Element="li"
      variant={variant}
      className={className}
      style={style}
    >
      {text && (
        <Typography Element={Element} variant={variant} {...rest}>
          {tx(text)}
        </Typography>
      )}

      {/* Reset Typograpy for nested children */}
      {children && <Typography>{children}</Typography>}
    </Typography>
  );
};

export default Item;
