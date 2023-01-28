import tw, { styled, theme } from 'twin.macro';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image, Typography } from '../../sormus';
import { breakpoints } from '../../sormus/constants';

const StyledBanner = styled.div`
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = tw(Image)`
  lg:min-w-full
  lg:min-h-full
  object-cover
  object-center
`;

const ContentWrapper = styled.div`
  ${tw`
  absolute
  w-full 
  z-10 
  text-left
  top-1/2
  transform 
  -translate-y-1/2`}

  @media (min-width: ${theme`screens.sm`}) and (max-height: 667px) {
    ${tw`
      top-1/4
      transform-none
    `}
  }
`;

const ContentBox = tw.div`
  flex
  flex-col
  items-baseline
  col-start-2 
  col-end-8
  lg:ml-20
  lg:mt-20
`;

const LogoImage = tw(Image)`
  mb-6
  w-1/2
`;

interface HeroProps {
  headerHeight: number;
}

const Banner = ({ children }) => {
  const matchDesktopScreen = useMediaQuery(
    `(min-width:${breakpoints.large}px)`,
  );
  return (
    <StyledBanner>
      <BackgroundImage
        src={
          matchDesktopScreen
            ? src('raoptics/m01-hero-full-img@2x', 'jpg', breakpoints.medium)
            : src('raoptics/01 Hero@2x', 'jpg')
        }
        alt="ra optics hero image"
        data-image-type={matchDesktopScreen ? 'desktop' : 'default'}
      />
      {matchDesktopScreen && (
        <ContentWrapper>
          <Grid>
            <ContentBox>
              <LogoImage
                src={src(`raoptics/oura-rao-logo-lockup`, 'svg')}
                alt="ra optics hero image"
                data-image-type={'default'}
              />

              {children}
            </ContentBox>
          </Grid>
        </ContentWrapper>
      )}
    </StyledBanner>
  );
};

const Hero = ({ headerHeight }: HeroProps) => {
  return (
    <div style={{ marginTop: `-${headerHeight}px` }} className="text-white">
      <Banner>
        <Typography variant="h3" Element="h1" color="white" className="mb-6">
          {t('raoptics_hero_title')}
        </Typography>
        <Typography variant="body" Element="h2" color="inherit">
          {t('raoptics_hero_subtitle', {
            exclusive: <em>{t('exclusive')}</em>,
          })}
        </Typography>
      </Banner>
    </div>
  );
};

export default Hero;
