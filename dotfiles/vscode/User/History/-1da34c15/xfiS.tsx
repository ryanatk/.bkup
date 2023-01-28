import { ReactElement } from 'react';
import { Typography } from '../../../components/sormus';
// import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

interface ItemProps {
  text?: string;
  // text?: MessageKey; // TODO
  className?: string;
}

const P = ({ text, className }: ItemProps): ReactElement => {
  return (
    <Typography Element="p" className={className}>
      {tx(text)}
    </Typography>
  );
};

export default P;
