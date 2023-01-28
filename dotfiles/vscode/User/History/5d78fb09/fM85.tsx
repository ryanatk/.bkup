import cx from 'classnames';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { breakpoints } from '../../sormus/constants';
import { LOGO } from './data';

interface Props {
  className?: string;
}

const LOGOS = [
  LOGO.NAVY,
  LOGO.BREX,
  LOGO.SEATTLE_MARINERS,
  LOGO.UFC,
  LOGO.OWN_IT,
  LOGO.NBA,
];

const BusinessLogoGarden = ({ className }: Props): ReactElement => {
  const { formatMessage } = useIntl();
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);

  return (
    <ul
      className={cx(
        className,
        'w-full',
        'grid grid-cols-3 md:grid-cols-6 gap-px md:gap-0',
        'text-grayscale-text border border-grayscale-light md:border-0 bg-grayscale-light',
      )}
    >
      {LOGOS.map(({ Icon, alt, size }) => (
        <li
          key={alt}
          className={cx('h-32 py-7 px-6', 'flex items-center', 'bg-gray-50')}
        >
          <Icon
            alt={formatMessage({ id: alt })}
            className="mx-auto"
            {...(isLargeScreen ? size.gardenLarge : size.gardenSmall)}
          />
        </li>
      ))}
    </ul>
  );
};

export default BusinessLogoGarden;
