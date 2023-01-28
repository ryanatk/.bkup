import cx from 'classnames';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { breakpoints } from '../../sormus/constants';
import { LOGO } from './data';

interface Props {
  className?: string;
}

const BusinessLogoGarden = ({ className }: Props): ReactElement => {
  const { formatMessage } = useIntl();
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);

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
      {Object.entries(LOGO).map(([key, { Icon, alt, size }]) => (
        <li key={key} className="h-28 py-7 px-6 flex items-center">
          <Icon
            alt={formatMessage({ id: alt })}
            className="mx-auto"
            {...(isMediumScreen ? size.large:size:small)}
          />
        </li>
      ))}
    </ul>
  );
};

export default BusinessLogoGarden;
