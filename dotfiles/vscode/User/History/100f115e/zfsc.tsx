import { useRouter } from 'next/router';
import { HTMLAttributeAnchorTarget } from 'react';
import { EventType, sendSegmentTrack } from '../../../../analytics';
import usePDPUrl from '../../../../hooks/usePDPUrl';
import { t } from '../../../../public/locales/LocaleContext';
import Button, { ButtonSize, ButtonVariant } from '../../Button';

export interface ShopButtonProps {
  inverse?: boolean;
  label?: React.ReactElement | React.ReactFragment | string | false;
  link?: string;
  target?: HTMLAttributeAnchorTarget;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  [x: string]: any;
}

const ShopButton = ({
  inverse = false,
  label = t('header_shop_now'),
  link,
  target,
  variant,
  className,
  ...rest
}: ShopButtonProps): JSX.Element => {
  const router = useRouter();
  const pdpUrl = usePDPUrl();
  const asPath = router?.asPath;

  const handleAnalytics = () => {
    sendSegmentTrack({
      type: EventType.CTAClicked,
      payload: {
        cta: 'shop_now',
        action: 'go_to_pdp',
        location: 'header',
        path: asPath,
      },
    });
  };

  return (
    <Button
      className={className}
      variant={variant || (inverse ? 'ghost' : 'tertiary')}
      href={link || pdpUrl}
      onClick={handleAnalytics}
      link
      target={target}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default ShopButton;
