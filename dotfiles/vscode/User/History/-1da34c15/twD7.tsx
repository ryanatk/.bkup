import { ReactElement, ReactNode } from 'react';
import { MessageKey } from '../../../../public/locales/setup';
import { Typography } from '../../../sormus';
import tx from './tx';

interface Props {
  tx: MessageKey;
  className?: string;
  values?: Record<string, ReactNode>;
}

const P = ({ tx: text, className, values = {} }: Props): ReactElement => {
  return (
    <Typography Element="p" className={className}>
      {tx(text, values)}
    </Typography>
  );
};

export default P;
