import { MessageKey } from '../../../../public/locales/setup';
import IconBrex from '../../../../svg/brex_logo.svg';
import IconNBA from '../../../../svg/nba_logo.svg';
import IconOwnIt from '../../../../svg/own_it_logo.svg';
import IconSeattleMariners from '../../../../svg/seattle_mariners_logo.svg';
import IconUFC from '../../../../svg/ufc_logo.svg';
import IconNavy from '../../../../svg/us_navy_logo.svg';
import IconWNBA from '../../../../svg/wnba_logo.svg';

interface LogoProps {
  Icon: JSX.Element;
  alt: MessageKey;
  size: {
    gardenSmall: {
      width: number;
      height: number;
    };
    gardenLarge: {
      width: number;
      height: number;
    };
  };
}

const LOGO: Record<string, LogoProps> = {
  BREX: {
    Icon: IconBrex,
    alt: 'brex_logo_alt',
    size: {
      gardenSmall: {
        width: 60,
        height: 17,
      },
      gardenLarge: {
        width: 122,
        height: 32,
      },
    },
  },
  NBA: {
    Icon: IconNBA,
    alt: 'nba_logo_alt',
    size: {
      gardenSmall: {
        width: 60,
        height: 35,
      },
      gardenLarge: {
        width: 84,
        height: 48,
      },
    },
  },
  NAVY: {
    Icon: IconNavy,
    alt: 'us_navy_logo_alt',
    size: {
      gardenSmall: {
        width: 60,
        height: 60,
      },
      gardenLarge: {
        width: 80,
        height: 80,
      },
    },
  },
  OWN_IT: {
    Icon: IconOwnIt,
    alt: 'own_it_logo_alt',
    size: {
      gardenSmall: {
        width: 84,
        height: 25,
      },
      gardenLarge: {
        width: 166,
        height: 48,
      },
    },
  },
  SEATTLE_MARINERS: {
    Icon: IconSeattleMariners,
    alt: 'seattle_mariners_logo_alt',
    size: {
      gardenSmall: {
        width: 60,
        height: 60,
      },
      gardenLarge: {
        width: 80,
        height: 80,
      },
    },
  },
  UFC: {
    Icon: IconUFC,
    alt: 'ufc_logo_alt',
    size: {
      gardenSmall: {
        width: 60,
        height: 20,
      },
      gardenLarge: {
        width: 108,
        height: 37,
      },
    },
  },
  WNBA: {
    Icon: IconWNBA,
    alt: 'wnba_logo_alt',
    size: {
      trustedBy: {
        width: 108,
        height: 37,
      },
    },
  },
};

export default LOGO;
