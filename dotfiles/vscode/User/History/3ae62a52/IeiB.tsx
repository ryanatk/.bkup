import cx from 'classnames';
import React from 'react';
import GucciLogo from './svgs/GUCCIXOURA_horiz.svg';
import GucciLogoMobile from './svgs/GUCCIXOURA_vert.svg';
import ReturnIcon from './svgs/ico-30-day-return.svg';
import ArrowBackward from './svgs/ico-arrow-backward.svg';
import ArrowForward from './svgs/ico-arrow-forward.svg';
import BatteryIcon from './svgs/ico-battery.svg';
import CartIcon from './svgs/ico-cart.svg';
import ChargerIcon from './svgs/ico-charger.svg';
import LightweightIcon from './svgs/ico-lightweight.svg';
import ShoppingBag from './svgs/ico-shopping-bag.svg';
import SizingKitIcon from './svgs/ico-sizing-kit.svg';
import WarrantyIcon from './svgs/ico-warranty.svg';
import WaterIcon from './svgs/ico-water.svg';
import AffirmLogo from './svgs/logo-affirm.svg';
import FacebookLogo from './svgs/logo-facebook.svg';
import OuraBusinessLogo from './svgs/logo-for-business-oura.svg';
import InstagramLogo from './svgs/logo-instagram.svg';
import OuraLogo from './svgs/logo-oura.svg';
import PaypalLogo from './svgs/logo-paypal.svg';
import TwitterLogo from './svgs/logo-twitter.svg';
import YouTubeLogo from './svgs/logo-youtube.svg';
import Maintenance from './svgs/maintenance.svg';
import New30DayReturn from './svgs/new_30_day_return.svg';
import PDPBattery from './svgs/pdp_battery.svg';
import PDPCharger from './svgs/pdp_charger.svg';
import PDPActivity from './svgs/pdp_horizon_activity_icon.svg';
import PDPCompatibility from './svgs/pdp_horizon_compatibility_icon.svg';
import PDPReadiness from './svgs/pdp_horizon_readiness_icon.svg';
import PDPSleep from './svgs/pdp_horizon_sleep_icon.svg';
import PDPTech from './svgs/pdp_horizon_tech_icon.svg';
import PDPWellness from './svgs/pdp_horizon_wellness_icon.svg';
import BalanceRing from './svgs/ring-balance.svg';
import HeritageRing from './svgs/ring-heritage.svg';

export interface VectorImageProps {
  /** name of image to load */
  name:
    | '30-day-return'
    | 'affirm'
    | 'balance-ring'
    | 'battery'
    | 'cart'
    | 'charger'
    | 'facebook'
    | 'heritage-ring'
    | 'instagram'
    | 'lightweight'
    | 'maintenance'
    | 'oura'
    | 'paypal'
    | 'pdp_activity'
    | 'pdp_compatibility'
    | 'pdp_readiness'
    | 'pdp_sleep'
    | 'pdp_tech'
    | 'pdp_wellness'
    | 'sizing-kit'
    | 'twitter'
    | 'warranty'
    | 'water'
    | 'youtube'
    | 'gucci'
    | 'gucci_mobile'
    | 'shopping_bag'
    | 'arrow_backward'
    | 'arrow_forward'
    | 'new_30_day_return'
    | 'pdp_charger'
    | 'pdp_battery'
    | string;
  /** optional max width in pixels */
  maxWidth?: number;
  /** optional color string */
  color?: string;
  /** optional width in pixels */
  width?: number;
  /** optional height in pixels */
  height?: number;
  /** optional className */
  className?: string;
}

const VectorImage: React.FC<VectorImageProps> = ({
  name,
  maxWidth,
  width,
  height,
  color = 'helsinkiBlue',
  className,
}) => {
  const getImage = () => {
    const styles = {
      width: width + 'px',
      height: height + 'px',
      maxWidth: maxWidth + 'px',
    };

    const arrowBackwardStyles = {
      transform: 'scale(-1)',
      ...styles,
    };

    switch (name) {
      case '30-day-return':
        return <ReturnIcon style={styles} />;
      case 'affirm':
        return <AffirmLogo style={styles} />;
      case 'balance-ring':
        return <BalanceRing style={styles} />;
      case 'battery':
        return <BatteryIcon style={styles} />;
      case 'cart':
        return <CartIcon style={styles} />;
      case 'charger':
        return <ChargerIcon style={styles} />;
      case 'facebook':
        return <FacebookLogo style={styles} />;
      case 'heritage-ring':
        return <HeritageRing style={styles} />;
      case 'instagram':
        return <InstagramLogo style={styles} />;
      case 'lightweight':
        return <LightweightIcon style={styles} />;
      case 'maintenance':
        return <Maintenance style={styles} />;
      case 'oura':
        return <OuraLogo style={styles} />;
      case 'oura-business':
        return <OuraBusinessLogo style={styles} />;
      case 'paypal':
        return <PaypalLogo style={styles} />;
      case 'pdp_activity':
        return <PDPActivity style={styles} />;
      case 'pdp_compatibility':
        return <PDPCompatibility style={styles} />;
      case 'pdp_readiness':
        return <PDPReadiness style={styles} />;
      case 'pdp_sleep':
        return <PDPSleep style={styles} />;
      case 'pdp_tech':
        return <PDPTech style={styles} />;
      case 'pdp_wellness':
        return <PDPWellness style={styles} />;
      case 'sizing-kit':
        return <SizingKitIcon style={styles} />;
      case 'twitter':
        return <TwitterLogo style={styles} />;
      case 'warranty':
        return <WarrantyIcon style={styles} />;
      case 'water':
        return <WaterIcon style={styles} />;
      case 'youtube':
        return <YouTubeLogo style={styles} />;
      case 'gucci':
        return <GucciLogo style={styles} />;
      case 'gucci_mobile':
        return <GucciLogoMobile style={styles} />;
      case 'shopping_bag':
        return <ShoppingBag style={styles} />;
      case 'arrow_backward':
        return <ArrowBackward style={arrowBackwardStyles} />;
      case 'arrow_forward':
        return <ArrowForward style={styles} />;
      case 'new_30_day_return':
        return <New30DayReturn styke={styles} />;
      case 'pdp_charger':
        return <PDPCharger style={styles} />;
      case 'pdp_battery':
        return <PDPBattery style={styles} />;
      default:
        return <OuraLogo style={styles} />;
    }
  };

  return (
    <div className={cx('fill-current', `text-${color}`, className)}>
      {getImage()}
    </div>
  );
};

export default VectorImage;
