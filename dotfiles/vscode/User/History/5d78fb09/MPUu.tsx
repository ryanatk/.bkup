import cx from 'classnames';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { LOGO } from './data';

interface Props {
  className?: string;
}

const BusinessLogoGarden = ({ className }: Props): ReactElement => {
  const { formatMessage } = useIntl();

  return (
    <ul
      className={cx(
        className,
        'text-grayscale-text',
        'w-full',
        'grid grid-cols-3',
        'md:flex flex-wrap justify-around',
      )}
    >
      {Object.entries(LOGO).map(([key, { Icon, alt, ...props }]) => (
        <li key={key} className="h-32 py-7 flex items-center">
          <Icon
            alt={formatMessage({ id: alt })}
            className="mx-auto"
            {...props}
          />
        </li>
      ))}
    </ul>
  );
};

export default BusinessLogoGarden;
