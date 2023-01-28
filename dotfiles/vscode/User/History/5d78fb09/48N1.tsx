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
  const isMediumScreen = useMediaQuery(`(min-width: ${breakpoints.medium}px)`);

  return (
    <ul
      className={cx(
        className,
        'text-grayscale-text',
        'w-full',
        'grid grid-cols-3 lg:grid-cols-6',
      )}
    >
      {LOGOS.map(({ Icon, alt, size }) => (
        <li key={alt} className="h-32 py-7 px-6 flex items-center">
          <Icon
            alt={formatMessage({ id: alt })}
            className="mx-auto"
            {...(isMediumScreen ? size.large : size.small)}
          />
        </li>
      ))}
    </ul>
  );
};

export default BusinessLogoGarden;
