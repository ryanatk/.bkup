import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventType } from '../analytics';
import {
  getNewQuantity,
  shouldAddSizingKit,
} from '../components/pages/product-bilbo/ProductSelect';
import { RINGS_BY_FINISH, RING_SIZE_NOT_SELECTED } from '../consts/ring';
import useDidCartUpdate from '../helpers/useDidCartUpdate';
import { CHARGER_SET } from '../hooks/useProduct';
import {
  PDPData_content,
  PDPData_content_productByHandle,
} from '../queries/types/PDPData';
import { reqAnalyticsEvent } from '../stores/app/actions';
import { getCountryCodeSelector } from '../stores/app/selectors';
import cartActions from '../stores/cart/actions';
import { getCartSelector } from '../stores/cart/selectors';
import { isCharger } from '../utils/cartCount';
import checkFeatureFlag from '../utils/checkFeatureFlag';

export enum RingStyle {
  Heritage = 'heritage',
  Horizon = 'horizon',
}

interface SubmitOptions {
  extendedWarrantyId: number;
}

interface AvailableRingStyles {
  horizon: boolean;
  heritage: boolean;
}

export interface ProductContextValues {
  loading: boolean;
  size: string;
  style: RingStyle;
  finish: string;
  setSize: Dispatch<SetStateAction<string>>;
  setStyle: Dispatch<SetStateAction<RingStyle>>;
  setFinish: Dispatch<SetStateAction<string>>;
  error: string;
  modal: string;
  product: PDPData_content_productByHandle;
  pdpData: PDPData_content;
  availableStyles: AvailableRingStyles;
  handleSubmit: (options: SubmitOptions) => void;
  handleUpdateModal: (val: string) => void;
  handleWarrantySubmit: (options: SubmitOptions) => void;
  EXTENDED_WARRANTY: string;
}

const ProductContext = createContext<ProductContextValues>(null);
const EXTENDED_WARRANTY = 'extended-warranty';

export const ProductProvider = ({
  product,
  pdpData,
  children,
}: {
  children: ReactNode;
  product: PDPData_content_productByHandle;
  pdpData: PDPData_content;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [size, setSize] = useState<string>(null);
  const [availableStyles, setAvailableStyles] = useState<AvailableRingStyles>();
  const [finish, setFinish] = useState<string>();
  const [style, setStyle] = useState<RingStyle>();
  const [error, setError] = useState<string>(null);
  const [modal, setModal] = useState<string>(null);

  const router = useRouter();

  const cart = useSelector(getCartSelector);
  const countryCode = useSelector(getCountryCodeSelector);

  const dispatch = useDispatch();

  const extendedWarrantyFlag = checkFeatureFlag('extended-warranty');
  const isChargerQuantityEnabled = checkFeatureFlag('enable-charger-quantity');

  const isChargerSet = product?.handle === CHARGER_SET;

  useEffect(() => {
    if (!isChargerSet) {
      if (product?.handle?.length > 0) {
        // Initially set style and finish based on PDP product data
        const newStyle: string = product.handle.split('-')[0];
        const newFinish: string = product.handle.split('-')[1];
        if (!style) setStyle(() => newStyle as RingStyle);
        if (!finish) setFinish(() => newFinish);
      }
    } else {
      if (product?.handle?.length > 0 && !!style) {
        setStyle(null);
        setFinish(null);
      }
    }
  }, [product, finish, isChargerSet, style]);

  // Compute available finishes for selected ring style
  useEffect(() => {
    if (finish) {
      setAvailableStyles(
        RINGS_BY_FINISH.filter((ring) => ring.finish.slug === finish)[0].styles,
      );
    }
  }, [finish]);

  // Unset sizing error when size is selected
  useEffect(() => {
    if (size && error) {
      setError(null);
    }
  }, [size, error]);

  useDidCartUpdate(() => {
    router.push('/cart');
  });

  const _getVariant = (sizeForVariant) => {
    const valueToTest = sizeForVariant
      ? sizeForVariant.toString()
      : RING_SIZE_NOT_SELECTED;
    return product.variants.find(
      (v) =>
        v.selectedOptions.find((o) => o.name === 'Size').value === valueToTest,
    );
  };

  const _handleError = (message: string) => setError(message);

  const _validateSelection = () => {
    if (!size) {
      _handleError('Please select a size.');
      return false;
    }
    return true;
  };

  const _addProductToCart = (options: SubmitOptions) => {
    const { extendedWarrantyId } = options;
    setLoading(true);
    const extendedWarrantySelectedId =
      extendedWarrantyId && extendedWarrantyId > 1 ? extendedWarrantyId : null;
    const variantId = Number(_getVariant(size).id);
    const lineItem = cart.lineItems.find(({ id }) => Number(id) === variantId);

    // currently only chargers are added cumulatively
    const isCumulative = isCharger(lineItem) && isChargerQuantityEnabled;

    dispatch(
      cartActions.reqUpdateCartItemsAction({
        cart,
        variantId,
        variantParentId: Number(product.id),
        quantity: getNewQuantity(lineItem, isCumulative),
        addFreeSizingKit: shouldAddSizingKit(isChargerSet, size),
        extendedWarrantyId: extendedWarrantySelectedId,
      }),
    );
    dispatch(
      reqAnalyticsEvent({ type: EventType.ProductAdded, payload: { product } }),
    );
  };

  const handleUpdateModal = (val: string) => setModal(val);

  const handleSubmit = (options: SubmitOptions) => {
    setLoading(true);
    const isValid = _validateSelection();
    if (!isValid) {
      setLoading(false);
      return;
    } else if (countryCode === 'US' && extendedWarrantyFlag && !isChargerSet) {
      handleUpdateModal(EXTENDED_WARRANTY);
    } else {
      _addProductToCart(options);
    }
  };

  const handleWarrantySubmit = (options: SubmitOptions) => {
    _addProductToCart(options);
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        size,
        style,
        finish,
        setSize,
        setStyle,
        setFinish,
        error,
        modal,
        product,
        pdpData,
        availableStyles,
        handleSubmit,
        handleUpdateModal,
        handleWarrantySubmit,
        EXTENDED_WARRANTY,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextValues => {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error(
      'Did you forget to include ProductContext Provider in your tree?',
    );
  return ctx;
};

export default ProductContext;
