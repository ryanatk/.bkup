import { t } from '../../../public/locales/LocaleContext';
import { Typography, TypographyRhythm } from '../../sormus';
import Modal from '../../sormus/Modal';
import withGoogleOptimize, {
  GoogleOptimizeProps,
} from '../../stateful/withGoogleOptimize';

interface Props extends GoogleOptimizeProps {
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

export default withGoogleOptimize(ProductModalMembership);
