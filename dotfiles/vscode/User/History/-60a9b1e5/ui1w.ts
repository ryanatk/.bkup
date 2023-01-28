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
  size: {
    small: {
      width: number;
      height: number;
    };
    large: {
      width: number;
      height: number;
    };
  };
}

const LOGO: Record<string, LogoProps> = {
  NAVY: {
    Icon: IconNavy,
    alt: 'us_navy_logo_alt',
    size: {
      small: {
        width: 60,
        height: 60,
      },
      large: {
        width: 80,
        height: 80,
      },
    },
  },
  BREX: {
    Icon: IconBrex,
    alt: 'brex_logo_alt',
    size: {
      small: {
        width: 60,
        height: 17,
      },
      large: {
        width: 122,
        height: 32,
      },
    },
  },
  NBA: {
    Icon: IconNBA,
    alt: 'business_feature_logo_us_navy_alt',
    size: {
      small: {
        width: 60,
        height: 35,
      },
      large: {
        width: 84,
        height: 48,
      },
    },
  },
  OWN_IT: {
    Icon: IconOwnIt,
    alt: 'business_feature_logo_us_navy_alt',
    size: {
      small: {
        width: 84,
        height: 25,
      },
      large: {
        width: 166,
        height: 48,
      },
    },
  },
  SEATTLE_MARINERS: {
    Icon: IconSeattleMariners,
    alt: 'business_feature_logo_us_navy_alt',
    size: {
      small: {
        width: 60,
        height: 60,
      },
      large: {
        width: 80,
        height: 80,
      },
    },
  },
  UFC: {
    Icon: IconUFC,
    alt: 'business_feature_logo_us_navy_alt',
    size: {
      small: {
        width: 60,
        height: 20,
      },
      large: {
        width: 108,
        height: 37,
      },
    },
  },
};

export default LOGO;
