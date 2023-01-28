import { ReactElement } from 'react';
import { Typography } from '../../../components/sormus';
import {
  TypographyElement,
  TypographyVariant,
} from '../../../components/sormus/Typography';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

const HEADING: {
  [x: number]: {
    Element: TypographyElement;
    variant: TypographyVariant;
  };
} = {
  1: {
    Element: 'h2',
    variant: 'h2',
  },
  2: {
    Element: 'h3',
    variant: 'h3',
  },
  3: {
    Element: 'h4',
    variant: 'h4',
  },
  4: {
    Element: 'h5',
    variant: 'h5',
  },
};

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 0;
  text: MessageKey;
}

const Heading = ({ level, text, ...rest }: HeadingProps): ReactElement => {
  const { Element, variant } = HEADING[level] ?? {};

  return (
    <Typography Element={Element} variant={variant} {...rest}>
      {tx(text)}
    </Typography>
  );
};

export default Heading;
