import { DateTime } from 'luxon';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { t } from '../../../public/locales/LocaleContext';
import DisplayableOrder, {
  DisplayableLineItem,
} from '../../../types/DisplayableOrder';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import {
  Alert,
  BodyLink,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '../../sormus';
import Modal from '../../sormus/Modal';
import TermsAgreement from '../_global/TermsAgreement';
import styles from './MyAccountOrdersList.module.scss';
import MyAccountOrderStatus from './MyAccountOrderStatus';
import MyAccountProductImage from './MyAccountProductImage';
import MyAccountRingSizeForm from './MyAccountRingSizeForm';

interface SizeSubmission {
  size: string;
  order: DisplayableOrder;
  lineItem: DisplayableLineItem;
  lineItemIndex: number;
}

interface MyAccountOrdersListProps {
  orders: DisplayableOrder[];
  onInitiateReturn: (order: DisplayableOrder) => void;
  onInitiateExchange: (order: DisplayableOrder) => void;
  onSubmitSize: (
    size: string,
    order: DisplayableOrder,
    lineItem: DisplayableLineItem,
    lineItemIndex: number,
  ) => void;
  updateItemLoading: string | boolean;
  updateItemStatus: {
    updatedItem?: string;
    selectedSize?: number;
    error?: boolean;
  };
}

const MyAccountOrdersList = ({
  orders,
  onInitiateReturn,
  onInitiateExchange,
  onSubmitSize,
  updateItemLoading,
  updateItemStatus,
}: MyAccountOrdersListProps) => {
  const orderToSubmit = useRef<SizeSubmission | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const { formatMessage } = useIntl();
  const SHOW_DELAYED_SHIPPING_MESSAGE = checkFeatureFlag(
    'my-account-show-delayed-shipping',
  );

  /**
   * Reset orderToSubmit when show modal is false
   */
  useEffect(() => {
    if (!showTermsModal) {
      orderToSubmit.current = null;
      setHasAcceptedTerms(false);
    }
  }, [showTermsModal]);

  if (!orders) return null;

  const sizeUpdateMessageOnSuccess = formatMessage({
    id: 'my_account_update_size_confirmation',
  });

  const sizeUpdateDelayedShippingMessage = formatMessage({
    id: 'my_account_update_size_confirmation_shipping_delay',
  });

  const sizeUpdateMessageOnError = formatMessage({
    id: 'my_account_update_size_error',
  });

  const handleSubmitSize = (sizeSubmission: SizeSubmission) => {
    onSubmitSize(
      sizeSubmission.size,
      sizeSubmission.order,
      sizeSubmission.lineItem,
      sizeSubmission.lineItemIndex,
    );
  };

  return (
    <>
      <Typography className="mb-8">{t('my_account_orders_mission')}</Typography>
      <Table unstyled className={styles.MyAccountOrderList__Table}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="text-center">
                {updateItemStatus && (
                  <div className="mb-8">
                    {!updateItemStatus.error ? (
                      <Alert severity="success" data-cy="update-size-success">
                        <Typography color="black">
                          {sizeUpdateMessageOnSuccess}
                        </Typography>
                        {SHOW_DELAYED_SHIPPING_MESSAGE && (
                          <Typography
                            className="mt-4"
                            color="black"
                            data-cy="update-size-success-shipping-delay"
                          >
                            {sizeUpdateDelayedShippingMessage}
                          </Typography>
                        )}
                      </Alert>
                    ) : (
                      <Alert severity="error" data-cy={`update-size-error`}>
                        <Typography color="black">
                          {sizeUpdateMessageOnError}
                        </Typography>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            {['Order', 'Image', 'Finish', 'Size'].map((label, index) => (
              <TableCell Element="th" scope="col" key={`table-cell-${index}`}>
                <Typography Element="span" variant="h6">
                  {label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: DisplayableOrder) => (
            <React.Fragment key={order.internalid}>
              {order.lineItems.map(
                (lineItem: DisplayableLineItem, lineItemIndex: number) => {
                  const requireSizing =
                    lineItem.skuDetails?.ringSize === 'Size later';
                  const productImageSrc =
                    lineItem.product?.lineItemImage?.originalSrc;
                  const ringColor = lineItem.product?.selectedTraits?.find(
                    (t) => t.name === 'Color',
                  );

                  const orderStatus = requireSizing
                    ? 'sizingNeeded'
                    : order.statusref;

                  const preSelectedSize =
                    updateItemStatus?.updatedItem === lineItem.sku
                      ? updateItemStatus?.selectedSize
                      : lineItem.skuDetails?.ringSize;

                  return (
                    <>
                      <TableRow key={lineItemIndex}>
                        <TableCell Element="th" scope="row">
                          <Typography
                            Element="h3"
                            variant="h6"
                            className={`${styles.MyAccountOrderList__Header} mb-4 lg:hidden`}
                            aria-hidden={true}
                          >
                            {order.tranid}
                          </Typography>
                          <Typography
                            Element="div"
                            className="text-inherit text-left"
                          >
                            {DateTime.fromFormat(
                              order.trandate,
                              'dd-LLL-yyyy',
                            ).toFormat('DD')}
                            <Typography
                              Element="span"
                              className={styles.MyAccountOrderList__OrderNo}
                            >
                              #{order.tranid}
                            </Typography>
                          </Typography>
                          <Typography className="text-inherit text-left">
                            Status:{' '}
                            <MyAccountOrderStatus
                              orderStatus={orderStatus}
                              trackingLink={order.trackingLink}
                            />
                          </Typography>
                          {!requireSizing && !order.editable && (
                            <>
                              <div className="flex gap-2 mt-4">
                                <div>
                                  <Button
                                    variant="tertiary"
                                    size="small"
                                    onClick={() => onInitiateReturn(order)}
                                  >
                                    Return
                                  </Button>
                                </div>
                                <div>
                                  <Button
                                    variant="tertiary"
                                    size="small"
                                    onClick={() => onInitiateExchange(order)}
                                  >
                                    Exchange
                                  </Button>
                                </div>
                              </div>
                              <Typography className="text-left mt-4">
                                For ring hardware defects,{' '}
                                <BodyLink
                                  href="https://support.ouraring.com/hc/en-us/articles/360025439534-Warranty-FAQs"
                                  target="_blank"
                                  color="helsinki-blue"
                                >
                                  contact customer support
                                </BodyLink>
                              </Typography>
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          {productImageSrc && (
                            <div
                              className={styles.MyAccountOrderList__Thumbnail}
                            >
                              <MyAccountProductImage src={productImageSrc} />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography Element="span" color="inherit">
                            {ringColor?.value}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {order.editable ? (
                            <div
                              className={
                                styles.MyAccountOrderList__RingSizeForm
                              }
                            >
                              <MyAccountRingSizeForm
                                onSubmit={(size: string) => {
                                  orderToSubmit.current = {
                                    size,
                                    order,
                                    lineItem,
                                    lineItemIndex,
                                  };

                                  if (hasAcceptedTerms) {
                                    handleSubmitSize(orderToSubmit.current);
                                  } else {
                                    setShowTermsModal(true);
                                  }
                                }}
                                preSelectedSize={preSelectedSize?.toString()}
                                loading={
                                  updateItemLoading &&
                                  updateItemLoading === lineItem.sku
                                }
                                terms={true}
                              />
                            </div>
                          ) : (
                            <Typography color="inherit" align="center">
                              {lineItem.skuDetails?.ringSize === 'Size later'
                                ? ''
                                : lineItem.skuDetails?.ringSize}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                },
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {showTermsModal ? (
        <Modal
          open={showTermsModal}
          onClose={() => {
            setShowTermsModal(false);
          }}
        >
          <Typography Element="h2" variant="h3">
            Submit Ring Size
          </Typography>
          <TermsAgreement
            onChange={() =>
              setHasAcceptedTerms((hasAcceptedTerms) => !hasAcceptedTerms)
            }
            checked={hasAcceptedTerms}
            name="sizing-agreement"
          />
          <Button
            data-cy="button-confirm-ring-size"
            onClick={() => {
              handleSubmitSize(orderToSubmit.current);
              setShowTermsModal(false);
            }}
            disabled={!hasAcceptedTerms}
          >
            Confirm Ring Size {orderToSubmit.current.size}
          </Button>
        </Modal>
      ) : null}
    </>
  );
};

export default MyAccountOrdersList;
