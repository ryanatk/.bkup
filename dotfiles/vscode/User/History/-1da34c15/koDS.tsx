import { ReactElement } from 'react';
import { Typography } from '../../../components/sormus';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

interface ItemProps {
  tx?: MessageKey; // TODO
  className?: string;
}

const P = ({ tx: text, className }: ItemProps): ReactElement => {
  return (
    <Typography Element="p" className={className}>
      {tx(text)}
    </Typography>
  );
};

export default P;
