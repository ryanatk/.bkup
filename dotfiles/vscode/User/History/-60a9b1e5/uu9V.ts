import { MessageKey } from '../../../../public/locales/setup';
import IconBrex from '../../../../svg/brex_logo.svg';
import IconNBA from '../../../../svg/nba_logo.svg';
import IconOwnIt from '../../../../svg/own_it_logo.svg';
import IconSeattleMariners from '../../../../svg/seattle_mariners_logo.svg';
import IconUFC from '../../../../svg/ufc_logo.svg';
import IconNavy from '../../../../svg/us_navy_logo.svg';

interface LogoProps {
  Icon: JSX.Element;
  alt: MessageKey;
  width?: number;
  height?: number;
}

const DEFAULTS = {
  width: 60,
  height: 60,
};

const LOGO: Record<string, LogoProps> = {
  NAVY: {
    ...DEFAULTS,
    Icon: IconNavy,
    alt: 'business_feature_logo_us_navy_alt',
  },
  BREX: {
    ...DEFAULTS,
    Icon: IconBrex,
    alt: 'business_feature_logo_us_navy_alt',
  },
  NBA: {
    ...DEFAULTS,
    Icon: IconNBA,
    alt: 'business_feature_logo_us_navy_alt',
  },
  OWN_IT: {
    ...DEFAULTS,
    Icon: IconOwnIt,
    alt: 'business_feature_logo_us_navy_alt',
    width: 84,
  },
  SEATTLE_MARINERS: {
    ...DEFAULTS,
    Icon: IconSeattleMariners,
    alt: 'business_feature_logo_us_navy_alt',
  },
  UFC: {
    ...DEFAULTS,
    Icon: IconUFC,
    alt: 'business_feature_logo_us_navy_alt',
  },
};

export default LOGO;
