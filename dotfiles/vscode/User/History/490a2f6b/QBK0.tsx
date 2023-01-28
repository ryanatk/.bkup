import { t } from '../../../public/locales/LocaleContext';
import { Typography, TypographyRhythm } from '../../sormus';
import Modal from '../../sormus/Modal';

const ProductModalMembership = ({ open, onClose }) => {
  const membershipPageTest = checkFeatureFlag('new-membership-page');
  const {
    ready: membershipPageTestReady,
    variantId: membershipPageTestVariantId,
  } = useGoogleOptimizeVariant(
    MEMBERSHIP_EXPERIMENT_ID,
    membershipPageTest ? 2000 : 0,
  );

  return (
    <Modal onClose={onClose} open={open}>
      <Typography variant="h3" Element="h2">
        {t('the_oura_membership')}
      </Typography>
      <TypographyRhythm>
        <Typography>{t('the_oura_membership_paragraph_1')}</Typography>
      </TypographyRhythm>
    </Modal>
  );
};

export default ProductModalMembership;
