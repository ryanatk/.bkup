import {
  BodyLink,
  Box,
  Footer,
  Header,
  PageContainer,
  Typography,
  TypographyRhythm,
} from '../../components/sormus';

const HRMTerms = () => {
  return (
    <div className="tailwind">
      <Header bordered />
      <PageContainer name="hrm-terms-and-conditions">
        <Box className="max-w-3xl">
          <TypographyRhythm>
            <Typography Element="h1" variant="h3">
              Health Risk Management Platform Terms and Conditions
            </Typography>
            <Typography>
              <strong>NBA/NBPA</strong> is requesting your permission to access
              limited portions of your Oura data that you have submitted via the
              Oura app or that may be collected by your Oura Ring. This includes
              your contact information, ring wear data, and risk score (“data”),
              which is a composite score that may correlate to symptoms of
              illness.
            </Typography>
            <Typography variant="h5" Element="h2">
              Information about the Oura Ring and Access to Your Data
            </Typography>
            <Typography>
              The Oura Ring measures four biosignals (heart rate, heart rate
              variability, respiratory rate, and body temperature variation)that
              it uses for illness monitoring.
            </Typography>
            <Typography>
              Use of the Oura ring is 100% voluntary, and data will only be
              shared with the individual using the device and the NBA and/or
              NBPA for the purpose of COVID-19-related health monitoring in
              connection with the resumption of the 2019-20 season. If the
              device’s illness probability score indicates that a player or
              staff member may be at higher risk for illness, the NBA and/or
              NBPA may notify a physician for the player or staff member’s team
              to assess any appropriate next steps.
            </Typography>
            <Typography>
              The individual user will have full access to all data collected on
              them from the Oura Ring. Teams will not have access to this data;
              however, teams will be notified in the event that an individual’s
              illness probability score indicates that such person may be at
              higher risk for, or is showing signs of, a possible coronavirus
              infection. Notified teams will receive the underlying illness
              score but will not receive the underlying data without written
              permission from the player or staff member who tested positive.
            </Typography>

            <Typography>
              By giving your consent, <strong>NBA and/or NBPA</strong> will
              become the Controller of the data, as that term is defined under
              The General Data Protection Regulation 2016/679.{' '}
              <strong>You may withdraw your consent at any time</strong> from
              your{' '}
              <BodyLink
                href="https://cloud.ouraring.com/account"
                target="_blank"
              >
                account settings page.
              </BodyLink>
            </Typography>

            <Typography>
              Please read the{' '}
              <BodyLink
                href="https://cloud.ouraring.com/legal/teams/privacy-policy"
                target="_blank"
              >
                Oura Teams Privacy Policy
              </BodyLink>
              for more information on how your personal data is processed in
              connection to the Oura Teams service.
            </Typography>

            <Typography>
              I hereby give <strong>NBA/NBPA</strong> permission to access and
              process my Oura data in accordance with the terms stated above and
              the Health and Safety Protocols for the Resumption of the 2019-20
              NBA Season.
            </Typography>

            <Typography>
              *These documents can be made available upon request. For any
              questions please contact us at{' '}
              <BodyLink href="mailto:nbasupport@ouraring.com">
                nbasupport@ouraring.com
              </BodyLink>
            </Typography>
          </TypographyRhythm>
        </Box>
      </PageContainer>
      <Footer />
    </div>
  );
};

HRMTerms.isSormusCompatible = true;
export default HRMTerms;
