import { useRouter } from 'next/router';
import { EventType, sendGTMWithSegmentEvent } from '../../../../analytics';
import { t } from '../../../../public/locales/LocaleContext';
import IconArrowRight from '../../../../svg/design-tokens/icon_arrow_right.svg';
import { srcSet } from '../../../../utils/imageHelpers';
import { Button, StoryWindows, Typography } from '../../../sormus';
import Icon from '../../../sormus/Icon';

const handleAnalytics = (cta: string, asPath: string) => {
  sendGTMWithSegmentEvent({
    type: EventType.CTAClicked,
    payload: {
      cta,
      module: 'community_module',
      path: asPath,
    },
  });
};

const BilboMeetTheCommunity = () => {
  const { asPath } = useRouter();

  return (
    <>
      <div className="p-4 pt-16 lg:p-0 lg:absolute lg:left-8 lg:top-8 lg:z-10 pointer-events-none">
        <Typography Element="h2" variant="h3" color="white">
          {t('meet_the_community_promo_title')}
        </Typography>
        <Typography
          Element="div"
          className="pointer-events-auto mb-10 mt-4 lg:mb-0 lg:mt-0"
          color="white"
        >
          <Button
            variant="basic"
            link={true}
            href="/meet-the-community"
            onClick={() => handleAnalytics('read_all_stories', asPath)}
            startIcon={
              <Icon outlined>
                <IconArrowRight />
              </Icon>
            }
          >
            {t('meet_the_community_promo_read_stories')}
          </Button>
        </Typography>
      </div>
      <StoryWindows
        imageSrcDesktopDefault={
          srcSet('homepage/community-ambassador-default').src
        }
        stories={[
          {
            title: 'Chris Paul',
            summary: 'meet_the_community_promo_chris_paul_quote',
            link: '/meet-the-community',
            imageSrc: srcSet(
              'homepage/community-ambassador-02',
              'jpg',
              [600, 1000],
            ).src,
            imageSrcDesktop: srcSet(
              'homepage/community-ambassador-02',
              'jpg',
              [1000, 1600],
            ).src,
          },
          {
            title: 'Lindsey Vonn',
            summary: 'meet_the_community_promo_lindsey_vonn_quote',
            link: '/meet-the-community',
            imageSrc: srcSet(
              'homepage/community-ambassador-03',
              'jpg',
              [600, 1000],
            ).src,
            imageSrcDesktop: srcSet(
              'homepage/community-ambassador-03',
              'jpg',
              [1000, 1600],
            ).src,
          },
          {
            title: 'Kai Lenny',
            summary: 'meet_the_community_promo_kai_lenny_quote',
            link: '/meet-the-community',
            imageSrc: srcSet(
              'homepage/community-ambassador-04',
              'jpg',
              [600, 1000],
            ).src,
            imageSrcDesktop: srcSet(
              'homepage/community-ambassador-04',
              'jpg',
              [1000, 1600],
            ).src,
          },
          {
            title: 'Laura',
            summary: 'meet_the_community_promo_laura_quote',
            link: '/meet-the-community',
            imageSrc: srcSet(
              'homepage/community-ambassador-05',
              'jpg',
              [600, 1000],
            ).src,
            imageSrcDesktop: srcSet(
              'homepage/community-ambassador-05',
              'jpg',
              [1000, 1600],
            ).src,
          },
        ]}
      />
    </>
  );
};

export default BilboMeetTheCommunity;
