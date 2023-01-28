import { ReactElement, ReactNode } from 'react';
import { Typography } from '../../../sormus';

interface Props {
  icon?: string;
  title: string;
  bodyElement?: 'p' | 'div' | 'ul';
  children: ReactNode;
}

const DescriptionItem = ({
  icon,
  title,
  bodyElement = 'p',
  children,
}: Props): ReactElement => {
  return (
    <li>
      <div className="flex items-center">
        {/* TODO: icon */}
        <span>{icon}</span>

        <Typography Element="h4" variant="h5" color="inherit">
          {title}
        </Typography>
      </div>

      <Typography Element={bodyElement} color="inherit">
        {children}
      </Typography>
    </li>
  );
};

export default DescriptionItem;
