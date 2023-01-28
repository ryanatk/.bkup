import { FormattedMessage } from 'react-intl';
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

const ProductResearch = (): JSX.Element => (
  <div className="py-10 md:py-32">
    <Grid rowCount={1}>
      <div className="col-start-2 col-main lg:col-start-3 lg:col-span-5">
        <Typography variant="h2" Element="h1" className="lg:max-w-lg">
          <FormattedMessage
            id="pdp_horizon_research_title"
            values={{
              i(chunks) {
                return <em className="font-serif">{chunks}</em>;
              },
            }}
          />
        </Typography>
      </div>
      <div className="col-start-2 col-main lg:col-start-8 lg:col-span-5">
        <Typography variant="h4">
          {t('pdp_horizon_research_description')}
        </Typography>
      </div>
    </Grid>

    <Grid rowCount={1} className="mt-12 lg:mt-16">
      <div className="col-start-2 col-main lg:col-start-3 lg:col-end-13">
        <Grid
          rowCount={1}
          className="grid-cols-1 lg:grid-flow-col lg:grid-cols-3 lg:gap-20"
        >
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

export default ProductResearch;
