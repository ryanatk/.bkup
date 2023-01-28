import { CaseStudy } from '../../../data/meet-the-community';
import { t } from '../../../public/locales/LocaleContext';
import { srcSet } from '../../../utils/imageHelpers';
import { Grid, Typography } from '../../sormus';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    title: 'UC San Diego',
    summary: t('pdp_horizon_research_case_studies_ucsd'),
    logo: 'meet-the-community/logo-UCSD@2x',
  },
  {
    title: 'West Virginia University',
    summary: t('pdp_horizon_research_case_studies_west_virginia'),
    logo: 'meet-the-community/logo-WVU@2x',
  },
];

const FsaResearch = (): JSX.Element => (
  <div className="py-10 md:py-32">
    <Grid>
      <div className="col-main lg:col-start-3 lg:col-end-12">
        <Typography variant="h2" Element="h3" className="lg:max-w-lg">
          The Oura Ring has been used in independent studies at UCSF, UC San
          Diego, MIT Lincoln Laboratory, the US Army, and the US Navy - with
          more already in the works.
        </Typography>
      </div>
    </Grid>

    <Grid className="mt-12 lg:mt-16">
      <div className="col-start-2 col-main lg:col-start-3 lg:col-end-13">
        <Grid className="grid-cols-1 lg:grid-flow-col lg:grid-cols-3 lg:gap-20">
          {CASE_STUDIES_DATA.map((caseStudy: CaseStudy) => (
            <div
              key={`casestudy-${caseStudy.title}`}
              className="flex flex-col items-start"
            >
              <div className={`mb-8`}>
                <img
                  {...srcSet(caseStudy.logo, 'png', [300, 600])}
                  className="w-auto h-16"
                  alt={caseStudy.title}
                  loading="lazy"
                  width="330"
                  height="50"
                />
              </div>
              <Typography className="mb-4">{caseStudy.summary}</Typography>
            </div>
          ))}
        </Grid>
      </div>
    </Grid>
  </div>
);

export default FsaResearch;
