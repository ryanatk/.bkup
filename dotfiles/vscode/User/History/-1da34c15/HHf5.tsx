import { ReactElement } from 'react';
import { Typography } from '../../../components/sormus';
import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

interface Props {
  tx: MessageKey;
  className?: string;
}

const P = ({ tx: text, className }: Props): ReactElement => {
  return (
    <Typography Element="p" className={className}>
      {tx(text)}
    </Typography>
  );
};

export default P;
