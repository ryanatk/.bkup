import tw from 'twin.macro';
import { EventType, sendSegmentTrack } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import { useFeatureFlag } from '../../../queries/FeaturesConfig';
import { Button, Grid, Typography } from '../../sormus';

const ContentWrapper = tw.div`
bg-helsinkiBlue-dark 
w-full 
text-white 
pb-16 
lg:pb-20
`;

export const ReferAFriend = () => {
  const { enabled: deepLinkEnabled } = useFeatureFlag('enable-deep-link');
  const { enabled: oneMonthEnabled } = useFeatureFlag(
    'one-month-free-membership',
  );
  const getYourCodeLink = deepLinkEnabled
    ? 'https://urlgeni.us/oura/raf22'
    : '#getstarted';

  const handleAnalytics = () => {
    sendSegmentTrack({
      type: EventType.CTAClicked,
      payload: {
        cta: 'get_your_code',
        module: 'get_your_code',
        location: 'raoptics',
        path: getYourCodeLink,
      },
    });
  };

  return (
    <ContentWrapper>
      <Grid>
        <div className="lg:hidden col-main pt-8">
          <Typography variant="h2" Element="h1" color="white" className="mb-6">
            {t('raoptics_hero_title')}
          </Typography>
          <Typography variant="body" Element="h2" color="inherit">
            {t('raoptics_hero_subtitle', {
              exclusive: <em>{t('exclusive')}</em>,
            })}
          </Typography>
        </div>
        <div className="col-main lg:col-start-3 lg:col-end-7 pt-20">
          <Typography variant="h3" Element="h3" color="white">
            {t('refer_a_friend')}
          </Typography>
          <Typography variant="h3" Element="h3" color="white">
            {t('improve_your_sleep')}
          </Typography>
        </div>
        <div className="col-main lg:col-start-8 lg:col-end-12 lg:pt-20">
          <Typography variant="body" color="white">
            {oneMonthEnabled
              ? t('raf_paragraph_1_onemonth')
              : t('raf_paragraph_1')}
          </Typography>
          <Button
            link
            href={getYourCodeLink}
            onClick={handleAnalytics}
            className="mt-8 bg-white text-helsinkiBlue-dark"
          >
            {t('get_your_code')}
          </Button>
        </div>
      </Grid>
    </ContentWrapper>
  );
};

export default ReferAFriend;
