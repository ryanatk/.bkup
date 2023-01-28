import { ReactElement } from 'react';
import { Typography } from '../../../components/sormus';
// import { MessageKey } from '../../../public/locales/setup';
import tx from './tx';

interface ItemProps {
  text?: string;
  // text?: MessageKey; // TODO
  className?: string;
}

const Item = ({ text, className, ...rest }: ItemProps): ReactElement => {
  return (
    <Typography Element="li" className={className}>
      {tx(text)}
    </Typography>
  );
};

export default Item;
