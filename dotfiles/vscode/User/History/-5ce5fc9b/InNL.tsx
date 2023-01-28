import { useDispatch, useSelector } from 'react-redux';
import {
  EXTENDED_WARRANTY_2YEAR_ID,
  EXTENDED_WARRANTY_3YEAR_ID,
} from '../../../consts/extendedWarranty';
import { t } from '../../../public/locales/LocaleContext';
import cartActions from '../../../stores/cart/actions';
import { getCartSelector } from '../../../stores/cart/selectors';
import { Button, Typography } from '../../sormus';
import Modal from '../../sormus/Modal';
import { useCheckoutContext } from './contexts/CheckoutProvider';

const CheckoutExtendedWarrantyModal = (): JSX.Element => {
  const { extendedWarrantyModal, onCloseExtendedWarrantyModal } =
    useCheckoutContext();
  const dispatch = useDispatch();
  const cart = useSelector(getCartSelector);

  const handleRemoveWarranty = () => {
    const extendedWarrantyLineItem = cart?.lineItems?.find(
      (lineItem) =>
        parseInt(lineItem.id) === EXTENDED_WARRANTY_2YEAR_ID ||
        parseInt(lineItem.id) === EXTENDED_WARRANTY_3YEAR_ID,
    );
    dispatch(
      cartActions.reqUpdateCartItemsAction({
        cart,
        variantId: Number(extendedWarrantyLineItem.id),
        quantity: 0,
        addFreeSizingKit: false,
      }),
    );
    onCloseExtendedWarrantyModal();
  };
  return (
    <Modal onClose={onCloseExtendedWarrantyModal} open={extendedWarrantyModal}>
      <Typography variant="h5" Element="h2">
        {t('extended_warranty_us_only')}
      </Typography>
      <div className="mt-8 text-grayscale-dark">{t('esc_modal_text')}</div>
      <div className="flex flex-col lg:flex-row justify-center gap-4 mt-12">
        <button
          data-cy="modal-remove-warranty"
          className="underline text-helsinkiBlue-dark"
          onClick={onCloseExtendedWarrantyModal}
        >
          {t('esc_modal_edit')}
        </button>
        <Button
          data-cy="modal-edit-shipping-address"
          onClick={() => handleRemoveWarranty()}
        >
          {t('esc_modal_continue')}
        </Button>
      </div>
    </Modal>
  );
};

export default CheckoutExtendedWarrantyModal;
