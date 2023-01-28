import cx from 'classnames';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image, Stat, StatsWrapper } from '../../sormus';
import { Typ } from './components';
import { BENEFITS } from './data';

const BusinessBenefits = (): ReactElement => {
  const { formatMessage } = useIntl();

  return (
    <Grid className="bg-sand-light py-20">
      <Typ
        Element="h2"
        variant="h2"
        className="col-main md:col-start-3 md:col-end-13 md:mb-7"
      >
        The Oura Effect
      </Typ>

      <Image
        className="col-main md:col-start-3 md:col-end-7"
        src={src('business/benefits@2x', 'jpg', 600)}
        alt={formatMessage({ id: 'business_benefits_alt' })}
      />

      <Typ
        Element="div"
        className={cx(
          'pt-4 md:pt-0',
          'flex flex-col justify-center',
          'col-main md:col-start-8 md:col-end-13',
        )}
      >
        <Typ Element="h3" variant="h5" className="mb-8">
          Oura members experience significant benefits within their first month
          <a href="#legal-footnotes">
            <sup>*</sup>
          </a>
          .
        </Typ>

        <StatsWrapper>
          {BENEFITS.map((stat) => (
            <Stat {...stat} key={stat.label} />
          ))}
        </StatsWrapper>
      </Typ>
    </Grid>
  );
};

export default BusinessBenefits;
