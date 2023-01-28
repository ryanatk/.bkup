import { ReactElement } from 'react';
import { Typography } from '../../../components/sormus';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

const HEADING: {
  [x: number | 'dot']: string;
} = {
  1: 'upper-roman',
  2: 'upper-alpha',
  3: 'lower-roman',
  4: 'lower-alpha',
  dot: 'disc',
};

interface HeadingProps {
  level: 1 | 2 | 3 | 4;
  text: MessageKey;
}

const Heading = ({ level, text, ...rest }: HeadingProps): ReactElement => {
  const { Element, variant } = HEADING[level];

  return (
    <Typography Element={Element} variant={variant} {...rest}>
      {tx(text)}
    </Typography>
  );
};

export default Heading;
