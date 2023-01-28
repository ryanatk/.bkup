import { ReactElement, ReactNode } from 'react';
import { Typography, VectorImage } from '../../../sormus';

interface Props {
  icon: string;
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
        <span className="inline-block w-8 h-8 text-ensoBlue border border-current rounded-lg">
          <VectorImage width={16} height={16} name={icon} color="ensoBlue" />
        </span>

        <Typography Element="h4" variant="h6" color="inherit">
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
