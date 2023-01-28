import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { EventType, sendSegmentTrack } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import { reqBrazeAction, reqGtmEvent } from '../../../stores/app/actions';
import ArrowCoral from '../../../svg/ico-arrow-coral.svg';
import ArrowGrey from '../../../svg/ico-arrow-gray.svg';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import BodyLink from '../BodyLink';
import Typography from '../Typography';

interface FooterEmailSignupProps {
  textColor?: string;
}

const FooterEmailSignup = ({
  textColor,
}: FooterEmailSignupProps): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const asPath = router?.asPath;
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [arrowColor, setArrowColor] = useState(<ArrowGrey />);
  const horizonEnabled = checkFeatureFlag('enable-horizon');
  const { formatMessage } = useIntl();

  function onNewsletterFormSubmit(e) {
    e.preventDefault();
    dispatch(
      reqGtmEvent({
        type: EventType.GenerateLead,
        payload: {},
      }),
    );
    const email = new FormData(e.currentTarget).get('email');
    dispatch(reqBrazeAction({ email }));
    e.currentTarget.reset();

    sendSegmentTrack({
      type: EventType.EmailSignupCompleted,
      payload: {
        path: asPath,
      },
    });

    if (email) setEmailSubmitted(true);
  }

  const onFocusArrow = () => setArrowColor(<ArrowCoral />);
  const onBlurArrow = () => setArrowColor(<ArrowGrey />);

  const handleEmailUpdate = ({ target }) => setEmailAddress(target.value);
  const color =
    textColor || (horizonEnabled ? 'helsinkiBlue-dark' : 'helsinkiBlue');

  return (
    <>
      <Typography
        variant="subhead3"
        className="mb-8 mt-24"
        weight="normal"
        color={color}
      >
        {t('footer_newsletter_label')}
      </Typography>
      <form onSubmit={onNewsletterFormSubmit} className="flex items-end">
        <TextField
          fullWidth
          InputLabelProps={{
            shrink: !!emailAddress,
            htmlFor: 'newsletter-signup',
          }}
          onFocus={onFocusArrow}
          onBlur={onBlurArrow}
          onChange={handleEmailUpdate}
          value={emailAddress}
          label={
            emailSubmitted
              ? t('footer_thanks_for_subscribing')
              : t('footer_email')
          }
          type="email"
          name="email"
          InputProps={{
            id: 'newsletter-signup',
            color: 'secondary',
            endAdornment: !emailSubmitted ? (
              <button
                type="submit"
                aria-label={formatMessage({
                  id: 'footer_newsletter_submit_label',
                })}
                onSubmit={onNewsletterFormSubmit}
              >
                <div className="p-2">{arrowColor}</div>
              </button>
            ) : null,
          }}
        />
      </form>
      <Typography
        variant="eyebrow"
        color={textColor || 'grayscale-dark'}
        className="mt-4"
        weight="normal"
      >
        {t('footer_dataprotect_1')}
      </Typography>
      <Typography
        variant="eyebrow"
        color={textColor || 'grayscale-dark'}
        weight="normal"
      >
        {t('footer_dataprotect_2')}&nbsp;
        <BodyLink href="/privacy-policy" color="inherit">
          {t('footer_privacy_policy')}
        </BodyLink>
        .
      </Typography>
    </>
  );
};

export default FooterEmailSignup;
