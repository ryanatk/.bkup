import { MessageKey } from '../../../../public/locales/setup';
import IconNavy from '../../../svg/us_navy_logo.svg';

interface LogoProps {
  Icon: JSX.Element;
  alt: MessageKey;
}

const LOGO: Record<string, LogoProps> = {
  NAVY: {
    Icon: IconNavy,
    alt: 'business_feature_logo_us_navy_alt',
  },
};

export default LOGO;
