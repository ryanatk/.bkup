import { ReactElement } from 'react';
import { Typography } from '../../../components/sormus';
import {
  TypographyElement,
  TypographyVariant,
} from '../../../components/sormus/Typography';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

type levelType = 1 | 2 | 3 | 4;

const getProps = (
  level: levelType,
): {
  Element: TypographyElement;
  variant: TypographyVariant;
} => {
  switch (level) {
    case 1:
      return {
        Element: 'h2',
        variant: 'h2',
      };
    case 2:
      return {
        Element: 'h3',
        variant: 'h3',
      };
    case 3:
      return {
        Element: 'h4',
        variant: 'h4',
      };
    case 4:
      return {
        Element: 'h5',
        variant: 'h5',
      };
  }
};

interface asdf {
  Element: TypographyElement;
  variant: TypographyVariant;
}

const LEVEL = {
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
  level: levelType;
  text: MessageKey;
}

const Heading = ({ level, text, ...rest }: HeadingProps): ReactElement => {
  // const { Element, variant } = LEVEL[level];
  const { Element, variant } = getProps(level);
  // const props = Object.assign({}, LEVEL[level], rest);

  return (
    <Typography Element={Element} variant={variant} {...rest}>
      {tx(text)}
    </Typography>
  );
};

export default Heading;
