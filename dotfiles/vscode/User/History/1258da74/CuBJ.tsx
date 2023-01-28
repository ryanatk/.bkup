import { KeyboardArrowDown } from '@material-ui/icons';
import React, { Fragment, HTMLAttributes } from 'react';
import tw from 'twin.macro';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Box,
  Grid,
  Typography,
  TypographyRhythm,
  VectorImage,
} from '../../sormus';
import { breakpoints } from '../../sormus/constants';
import { VectorImageProps } from '../../sormus/VectorImage';
import { FEATURES_CONTENT } from './product-horizon-features-content';

const FeatureLabel = ({
  icon,
  title,
  ...props
}: {
  icon: JSX.Element;
  title: MessageKey;
} & HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>
    {icon}
    <Typography color="ensoBlue" variant="h3" className="ml-4" Element="h2">
      {t(title)}
    </Typography>
  </div>
);

const FeatureEntry = ({
  title,
  content,
  label = null,
  ...props
}: {
  title: MessageKey;
  content: MessageKey | JSX.Element;
  label: MessageKey;
} & HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>
    <TypographyRhythm>
      {label && (
        <Typography
          color="success"
          className="lg:-mt-4 -mb-4 pt-2 italic"
          variant="eyebrow"
        >
          {t(label)}
        </Typography>
      )}
      <Typography color="white" variant="h6" weight="medium" Element="h3">
        {t(title)}
      </Typography>
      {typeof content === 'string' ? (
        <Typography color="white">{t(content as MessageKey)}</Typography>
      ) : (
        content
      )}
    </TypographyRhythm>
  </div>
);

const CategoryImage = ({
  name,
}: {
  name: VectorImageProps['name'];
}): JSX.Element => <VectorImage width={40} height={40} name={name} />;

const DesktopFeatureContent = (): JSX.Element => (
  <Grid>
    <Typography
      color="white"
      variant="h3"
      className="col-main col-end-6 lg:col-start-3"
      Element="h1"
    >
      {t('pdp_horizon_all_features')}
    </Typography>
    {FEATURES_CONTENT.map((category, i) => (
      <Fragment key={`desktop-category-${category.title}`}>
        <FeatureLabel
          className={`col-main flex items-center lg:col-start-6 lg:col-end-13 ${
            i > 0 && 'border-t border-helsinkiBlue mt-8 pt-20'
          }`}
          icon={<CategoryImage name={category.icon} />}
          title={category.title}
        />
        {category.features.map((feature, j) => (
          <FeatureEntry
            key={`feature-desktop-${feature.title}`}
            className={
              j % 2 === 0
                ? 'col-main col-start-6 col-end-9'
                : 'col-main col-start-10 col-end-13'
            }
            title={feature.title}
            content={feature.content}
            label={feature.label}
          />
        ))}
      </Fragment>
    ))}
  </Grid>
);

const MobileFeaturesTemplate = (): JSX.Element => (
  <Box>
    <Typography color="white" variant="h2">
      {t('pdp_horizon_all_features')}
    </Typography>
    <Accordion nested icon={<KeyboardArrowDown className="text-white" />}>
      {FEATURES_CONTENT.map((category, i) => (
        <Fragment key={`category-mobile-${category.title}`}>
          <AccordionHeader>
            <FeatureLabel
              className={`col-main flex items-center pt-4 pb-4 ${
                i > 0 && 'border-t border-helsinkiBlue'
              }`}
              icon={<CategoryImage name={category.icon} />}
              title={category.title}
            />
          </AccordionHeader>
          <AccordionContent>
            <div css={tw`ml-12 pb-8`}>
              {category.features.map((feature) => (
                <FeatureEntry
                  key={`feature-mobile-${feature.title}`}
                  css={tw`col-main mb-8`}
                  title={feature.title}
                  content={feature.content}
                  label={feature.label}
                />
              ))}
            </div>
          </AccordionContent>
        </Fragment>
      ))}
    </Accordion>
  </Box>
);

const ProductFeatures = (): JSX.Element => {
  const matchDesktopScreen = useMediaQuery(
    `(min-width:${breakpoints.large}px)`,
  );

  return (
    <div className="bg-helsinkiBlue-dark py-16 lg:py-32">
      {matchDesktopScreen ? (
        <DesktopFeatureContent />
      ) : (
        <MobileFeaturesTemplate />
      )}
    </div>
  );
};

export default ProductFeatures;
