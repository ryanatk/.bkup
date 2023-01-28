import {
  BodyLink,
  Box,
  Footer,
  Header,
  PageContainer,
  Typography,
  TypographyRhythm,
} from '../../components/sormus';

const Page = () => {
  return (
    <div className="tailwind">
      <Header bordered />
      <PageContainer name="accessibility">
        <Box className="max-w-3xl">
          <TypographyRhythm>
            <Typography variant="h1" Element="h1">
              Accessibility
            </Typography>

            <Typography>
              At Oura, we are committed to promoting accessibility and
              inclusion. We believe all of our clients should be able to
              successfully shop online at{' '}
              <BodyLink href="https://ouraring.com" color="inherit">
                ouraring.com
              </BodyLink>
              . Regardless of the assistive technologies that you are using our
              goal is to make your experience at Oura successful and enjoyable.
            </Typography>

            <Typography>
              We are currently and continuously working on implementing
              technological improvements to enhance the accessibility on our
              website and mobile site. As we continue to work towards this goal
              we welcome any feedback that you may have for us. Please feel free
              to{' '}
              <BodyLink
                href="https://support.ouraring.com/hc/en-us/requests/new"
                color="inherit"
                target="_blank"
              >
                contact us
              </BodyLink>
              .
            </Typography>
          </TypographyRhythm>
        </Box>
      </PageContainer>
      <Footer />
    </div>
  );
};

Page.isSormusCompatible = true;
Page.pageName = 'Accessibility';
export default Page;
