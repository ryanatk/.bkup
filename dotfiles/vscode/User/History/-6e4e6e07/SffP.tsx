import { ReactElement } from 'react';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

const HEADING: {
  [x: number]: {
    [x: string]: string;
  };
} = {
  1: { listStyleType: 'upper-roman' },
  2: { listStyleType: 'upper-alpha' },
  3: { listStyleType: 'lower-roman' },
  4: { listStyleType: 'lower-alpha' },
  0: { listStyleType: 'disc' },
};

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 0;
  text: MessageKey;
}

const Heading = ({ level, text, ...rest }: HeadingProps): ReactElement => {
  const style = HEADING[level];

  return (
    <ol style={style} {...rest}>
      {tx(text)}
    </ol>
  );
};

export default Heading;