import { css } from '@emotion/react';
import React from 'react';
import tw from 'twin.macro';
import { t } from '../../../public/locales/LocaleContext';
import { useFeatureFlag } from '../../../queries/FeaturesConfig';
import { srcSet } from '../../../utils/imageHelpers';
import { Grid, List, ListItem, Typography } from '../../sormus';
import { breakpoints } from '../../sormus/constants';

const mobileBgGradient = `
background-image: linear-gradient( 88deg, #b3b3b5 4.22%, #bfbfc1 38.17%, #c4c4c6 57.56%, #cacacc 97.25%);
`;

const desktopBgGradient = `
background-image: linear-gradient(
  180deg,
  #dedcdd 1.14%,
  #dddbdc 23.83%,
  #dcdadb 44.36%,
  #dbd9da 60.43%,
  #d5d3d4 78.6%,
  #d3d1d4 98.38%
);
`;

const ImageWrapper = tw.div`
  col-full
  overflow-hidden
  lg:(col-end-8 relative)
`;

const Image = tw.img`
  w-full
  max-w-md
  mx-auto
  lg:(
    h-3/4
    w-auto
    max-w-none
    absolute
    right-0
    top-1/2
    transform
    -translate-y-1/2
  )
  xl:(h-full)
`;

const ContentWrapper = tw.div`
  col-main
  pb-20
  md:(col-start-3 col-end-13)
  lg:(col-start-8 pl-12 py-24)
`;

const BenefitTitle = tw(Typography)`
  pb-3
  font-bold
  md:(pb-4 text-xl)
`;

export const MembershipBenefits = (): JSX.Element => {
  const { enabled: oneMonthEnabled } = useFeatureFlag(
    'one-month-free-membership',
  );
  return (
    <section
      css={css`
        ${mobileBgGradient}
        @media (min-width: ${breakpoints.large}px) {
          ${desktopBgGradient}
        }
      `}
    >
      <Grid>
        <ImageWrapper>
          <Image
            {...srcSet('membership/membership_benefits_background@2x', 'png')}
            alt={''}
            loading="lazy"
          />
        </ImageWrapper>
        <ContentWrapper>
          <div className="pb-8 md:pb-14">
            <BenefitTitle Element="h3" variant="body">
              {oneMonthEnabled
                ? t('membership_benefits_first_month_title')
                : t('membership_benefits_first_six_months_title')}
            </BenefitTitle>
            <Typography className="md:text-xl">
              {t('membership_benefits_first_six_months_body', {
                footnoteLink: (
                  <sup>
                    <a href="#legal-footnotes">*</a>
                  </sup>
                ),
              })}
            </Typography>
          </div>
          <div className="pb-8 md:pb-14">
            <BenefitTitle Element="h3" variant="body">
              {t('membership_benefits_evolving_title')}
            </BenefitTitle>
            <Typography className="pb-6 md:pb-8 md:text-xl">
              {t('membership_benefits_evolving_body')}
            </Typography>
            <BenefitTitle element="h4" variant="body">
              {t('membership_benefits_coming_soon_title')}
            </BenefitTitle>
            <List type="ul">
              <ListItem className="md:text-xl">
                {t('membership_benefits_coming_soon_bullet_1')}
              </ListItem>
            </List>
          </div>
          <div>
            <BenefitTitle Element="h3" variant="body">
              {t('membership_benefits_nonpaying_members_title')}
            </BenefitTitle>
            <Typography className="md:text-xl">
              {t('membership_benefits_nonpaying_members_body')}
            </Typography>
          </div>
        </ContentWrapper>
      </Grid>
    </section>
  );
};

export default MembershipBenefits;
