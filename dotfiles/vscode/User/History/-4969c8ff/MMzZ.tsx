import { ReactElement } from 'react';
import { Typography } from '../../../sormus';

interface Props {
  icon: string;
  title: string;
  body: string;
}

const DescriptionItem = ({ icon, title, body }: Props): ReactElement => {
  return (
    <li>
      <div className="flex items-center">
        {/* TODO: icon */}
        <span>{icon}</span>

        <Typography Element="h4" variant="h5" color="inherit">
          {title}
        </Typography>
      </div>

      <Typography color="inherit">{body}</Typography>
    </li>
  );
};

export default DescriptionItem;
