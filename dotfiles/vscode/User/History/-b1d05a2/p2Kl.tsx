import { Typography } from '@material-ui/core';
import Alert from '../../sormus/Alert';

const CartQuantityAlert = (quantityMessage): JSX.Element => {
  return quantityMessage ? (
    <div className="pt-6">
      <Alert severity="info" data-cy="cart-error" textColor="helsinkiBlue">
        <Typography>{quantityMessage}</Typography>
      </Alert>
    </div>
  ) : (
    <></>
  );
};

export default CartQuantityAlert;
