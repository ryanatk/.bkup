import { ReactElement, ReactNode } from 'react';
import { MessageKey } from '../../../public/locales/setup';

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
  children: ReactNode;
}

const Heading = ({ level, children, ...rest }: HeadingProps): ReactElement => {
  const style = HEADING[level];

  return (
    <ol style={style} {...rest}>
      {children}
    </ol>
  );
};

export default Heading;
