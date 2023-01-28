import { KeyboardArrowDown } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import tw from 'twin.macro';
import { EventType, sendGTMWithSegmentEvent } from '../../../analytics';
import { ROSE_GOLD_FINISH_HANDLE } from '../../../consts/ring';
import { useSubPrice } from '../../../helpers/bilboHelper';
import { CHARGER_SET } from '../../../hooks/useProduct';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { useProductByHandle } from '../../../queries/Products';
import { PDPData_content_productByHandle } from '../../../queries/types/PDPData';
import { getCurrencySelector } from '../../../stores/app/selectors';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Button,
  List,
  Typography,
  TypographyRhythm,
} from '../../sormus';

const AccordionWrapper = tw.div`
    border-b
    my-8
`;

const HeaderContents = tw.div`
    border-t
    py-4
`;

const Content = tw.div`
    pb-4
`;

const getRingDescription = (handle: string): MessageKey[] => {
  const output = [
    'pdp_horizon_description_of_ring_water',
    'pdp_horizon_description_of_ring_weight',
    'pdp_horizon_description_of_ring_titanium',
    'pdp_horizon_description_of_ring_charger',
    'pdp_horizon_description_of_ring_scratches',
  ] as MessageKey[];
  if (handle === ROSE_GOLD_FINISH_HANDLE) {
    return [...output, 'pdp_horizon_description_of_ring_rose_gold'];
  }
  return output;
};

const getProductContent = (handle, subPrice) => {
  if (!handle) return;

  if (handle === CHARGER_SET) {
    return [
      {
        key: 'charger-description',
        title: t('pdp_horizon_description_title'),
        content: (
          <TypographyRhythm>
            <List type="ul">
              <li>{t('pdp_charger_set_contains_charger')}</li>
              <li>{t('pdp_charger_ring_size')}</li>
            </List>
          </TypographyRhythm>
        ),
      },
    ];
  }

  // ring content
  return [
    {
      key: 'ring-description',
      title: t('pdp_horizon_description_title'),
      content: (
        <TypographyRhythm>
          <Typography>{t('pdp_horizon_description_of_ring')}</Typography>
          <List type="ul">
            {getRingDescription(handle).map((key, i) => (
              <li key={`ring-description-${handle}-${i}`}>{t(key)}</li>
            ))}
          </List>
        </TypographyRhythm>
      ),
    },
    {
      key: 'membership',
      title: t('pdp_horizon_membership_title'),
      content: (
        <>
          <TypographyRhythm>
            <Typography>
              {t('pdp_horizon_membership_description_trial', {
                price: subPrice,
              })}
            </Typography>
            <Typography>
              {t('pdp_horizon_membership_features_title')}
            </Typography>
            <List type="ul">
              <li>{t('pdp_horizon_membership_description_sleep')}</li>
              <li>{t('pdp_horizon_membership_description_insights')}</li>
              <li>{t('pdp_horizon_membership_description_hrm')}</li>
              <li>{t('pdp_horizon_membership_description_temp')}</li>
            </List>
            <Typography>
              {t('pdp_horizon_membership_description_new_members')}
            </Typography>
            <Typography>
              {t('pdp_horizon_membership_description_terms')}
            </Typography>
          </TypographyRhythm>
          <Button
            link
            href="/membership"
            variant="tertiary"
            size="medium"
            className="mt-2 mb-4"
          >
            {t('pdp_horizon_membership_more_info_button')}
          </Button>
        </>
      ),
    },
  ];
};

const ProductInfoAccordion = ({
  product,
}: {
  product: PDPData_content_productByHandle;
}): JSX.Element => {
  const handleAnalytics = () => {
    sendGTMWithSegmentEvent({
      type: EventType.SectionExpanded,
      payload: {},
    });
  };

  const { data: subscriptionProduct } = useProductByHandle('subscription');
  const { locale } = useRouter();
  const currencyCode = useSelector(getCurrencySelector);
  const comparePrice = subscriptionProduct?.comparePrice;
  const subPrice = useSubPrice(comparePrice);
  const content = getProductContent(
    product?.handle,
    subPrice?.toLocaleString(locale, {
      style: 'currency',
      currency: currencyCode,
    }),
  );

  return (
    <>
      {content?.length && (
        <AccordionWrapper>
          <Accordion
            nested
            icon={<KeyboardArrowDown className="text-helsinkiBlue" />}
            openAtIndex={-1}
            onChange={handleAnalytics}
          >
            {content?.map((item) => (
              <Fragment key={`item-${item.key}`}>
                <AccordionHeader data-cy={`product-accordion-${item.key}`}>
                  <HeaderContents>
                    <Typography variant="subhead3" weight="medium">
                      {item.title}
                    </Typography>
                  </HeaderContents>
                </AccordionHeader>
                <AccordionContent>
                  <Content data-cy={`product-accordion-content-${item.key}`}>
                    {item.content}
                  </Content>
                </AccordionContent>
              </Fragment>
            ))}
          </Accordion>
        </AccordionWrapper>
      )}
    </>
  );
};

export default ProductInfoAccordion;
