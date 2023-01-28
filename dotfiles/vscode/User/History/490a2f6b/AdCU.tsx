import { t } from '../../../public/locales/LocaleContext';
import { Typography, TypographyRhythm } from '../../sormus';
import Modal from '../../sormus/Modal';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ProductModalMembership = ({ open, onClose }: Props): JSX.Element => (
  <Modal onClose={onClose} open={open}>
    <Typography variant="h3" Element="h2">
      {t('the_oura_membership')}
    </Typography>
    <TypographyRhythm>
      <Typography>{t('the_oura_membership_paragraph_1')}</Typography>
    </TypographyRhythm>
  </Modal>
);

export default ProductModalMembership;
