import { ReactElement } from 'react';
import { Typography } from '../../../components/sormus';
import {
  TypographyElement,
  TypographyVariant,
} from '../../../components/sormus/Typography';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

type level = 'top' | '2nd' | 'item' | 'sub';

// const getProps = (level: level) =>
//   // : {
//   //   Element: TypographyElement;
//   //   variant: TypographyVariant;
//   // }
//   {
//     switch (level) {
//       case 'top':
//         return {
//           Element: 'h2',
//           variant: 'h2',
//         };
//       case '2nd':
//         return {
//           Element: 'h3',
//           variant: 'h3',
//         };
//       case 'item':
//         return {
//           Element: 'h4',
//           variant: 'h4',
//         };
//       case 'sub':
//         return {
//           Element: 'h5',
//           variant: 'h5',
//         };
//     }
//   };

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
  level: 1 | 2 | 3 | 4;
  text: MessageKey;
}

const Heading = ({ level, text, ...rest }: HeadingProps): ReactElement => {
  const { Element, variant } = LEVEL[level];
  // const props = Object.assign({}, LEVEL[level], rest);

  return (
    <Typography Element={Element} variant={variant} {...rest}>
      {tx(text)}
    </Typography>
  );
};

export default Heading;
