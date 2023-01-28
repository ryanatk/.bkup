import cx from 'classnames';
import { ReactElement } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { Grid } from '../../sormus';
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
  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoints.large}px)`);

  return (
    <Grid
      className={cx(
        'text-grayscale-text p-px bg-grayscale-light',
        'md:p-0 md:bg-gray-50',
      )}
    >
      <ul
        className={cx(
          className,
          'col-full md:col-start-3 md:col-end-13',
          'grid grid-cols-3 gap-px',
          'md:grid-cols-6 md:gap-0',
        )}
      >
        {LOGOS.map(({ Icon, alt, size }) => (
          <li
            key={alt}
            className={cx('h-32 py-7 px-6', 'flex items-center', 'bg-gray-50')}
          >
            <Icon
              className="mx-auto"
              {...(isLargeScreen ? size.gardenLarge : size.gardenSmall)}
              aria-hidden="true" // screen readers will use "alt" span below
            />
            <span className="sr-only">{t(alt)}</span>
          </li>
        ))}
      </ul>
    </Grid>
  );
};

export default BusinessLogoGarden;
