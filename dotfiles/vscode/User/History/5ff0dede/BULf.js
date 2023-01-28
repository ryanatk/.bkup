import mockAxios from 'axios';

import getCompletedOrders from './getCompletedOrders';
import mock from './getCompletedOrders.mock';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const customerId = '3dcf48b3-11b3-437f-8cfb-6b3ff95a94a3';
const EXPECTED_BASE_URL = 'http://localhost/2/';

const { data } = mock({ customerId });

const setup = ({ customerId }) => {
  const mockResolved = () =>
    mockAxios.get.mockResolvedValueOnce(mock({ customerId }));
  const mockReject = () => mockAxios.get.mockRejectedValueOnce();

  const getCompleted = () => getCompletedOrders(customerId);

  return { mockResolved, mockReject, getCompleted };
};

it('successfully calls orders2/completed_orders endpoint', async () => {
  const expectedUrl = `${EXPECTED_BASE_URL}orders2/completed_orders/${customerId}`;

  const { mockResolved, getCompleted } = setup({ customerId });

  mockResolved();

  await getCompleted();
  expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl);
});

describe('Parameter Validation', () => {
  const setupValidation = (params) => {
    const { mockReject, getCompleted } = setup(params);
    mockReject();
    return { getCompleted };
  };

  it('throws an expected error with customerId missing', async () => {
    const { getCompleted } = setupValidation({ customerId: undefined });

    await expect(() => getCompleted()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid customerId parameter', async () => {
    const { getCompleted } = setupValidation({ customerId: 'iaminvalid' });

    await expect(() => getCompleted('iaminvalid')).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });
});

it('returns an object with the expected shape and data', async () => {
  const { mockResolved, getCompleted } = setup({ customerId });

  mockResolved();

  const order = data.onlineOrdersData[0];
  const totalData = order.orderDetailTotals;
  const item = order.orderDetails[0];

  const response = await getCompleted();

  const { assessmentResponseData, ...result } = response[0];

  expect(result.totals).toEqual({
    ccFee: totalData.creditCardProcessingFee,
    discount: totalData.discount,
    serviceFee: totalData.serviceFeeTotal,
    subtotal: totalData.subTotal,
    tax: totalData.taxTotal,
    total: totalData.grandTotal,
    wireFee: totalData.wireTransferFee,
  });

  expect(result.totalsData).toEqual({
    ccFee: totalData.creditCardProcessingFee,
    discount: totalData.discount,
    serviceFee: totalData.serviceFeeTotal,
    subtotal: totalData.subTotal,
    tax: totalData.taxTotal,
    total: totalData.grandTotal,
    wireFee: totalData.wireTransferFee,
  });

  expect(result.items).toEqual([
    {
      cartId: item.id,
      id: item.itemID,
      name: item.itemDescription,
      image: item.picturePath,
      quantity: item.quantity,
      ooSummaryId: item.ooSummaryID,
      advancedPrice: item.prices[0].itemPrice,
      floorPrice: item.prices[1].itemPrice,
      price: item.price,
      priceListId: item.priceListID,
      category: item.categoryDescription,
      associatedCategory: item.associatedCategory,
      isRequired: item.isAutoAdded,
      isPackage: item.itemID > 99000,
      addIncrement: 1,
      updateIncrement: 1,
      description: item.itemLongDescription,
      blurb: item.blurb,
      requiredItems: item.requiredItems,
      suggestedItems: item.suggestedItems,
    },
  ]);

  expect(result.payment).toEqual({
    last4: order.orderPaymentDetails?.last4digit.substring(
      order.orderPaymentDetails?.last4digit?.length - 4,
    ),
    method: 'CARD', // TODO: need abstraction on this
    type: order.orderPaymentDetails.type,
    amountPaid: order.orderPaymentDetails?.amount,
  });

  expect(result.companyInformation).toEqual({
    address: order.companyInformation.address,
    name: order.companyInformation.name,
    phone: order.companyInformation.address.phone,
  });

  expect(result.personalInformation).toEqual({
    email: order.personalInformation.emailAddress,
    firstName: order.personalInformation.firstName,
    lastName: order.personalInformation.lastName,
    mobile: order.personalInformation.addressInformation.mobile,
    addressInformation: order.personalInformation.addressInformation,
  });

  expect(result).toEqual({
    boothNumber: order.boothData.number,
    boothNum: order.boothData.number,
    id: order.oO_ID.toString(),
    eventId: order.eventID,
    eventName: order.eventName,
    itemCount: order.orderDetails.reduce(
      (count, { quantity }) => count + quantity,
      0,
    ),
    floorPlanExists: order.floorPlanExists,
    date: order.orderDate,
    isCompleted: true,
    billingId: order.billinghAddID,
    exhibitorId: order.exhAddID,
    isPending: order.orderStatus === 'Pending',
    isThirdParty: order.isThirdParty,
    thirdPartyCompanyName: order.thirdPartyExhibitorCompanyName,
    orderTotal: order.orderTotal,
    personalInformation: expect.any(Object),
    companyInformation: expect.any(Object),
    payment: expect.any(Object),
    items: expect.any(Array),
    totalsData: expect.any(Object),
    totals: expect.any(Object),
  });
});

it('returned data is defined where expected', async () => {
  const { mockResolved, getCompleted } = setup({ customerId });

  mockResolved();

  const result = await getCompleted();
  const { items, totals, totalsData, ...order } = result[0];
  const item = items[0];

  expect(order.boothNumber).toBeDefined();
  expect(order.boothNum).toBeDefined();
  expect(order.id).toBeDefined();
  expect(order.eventId).toBeDefined();
  expect(order.eventName).toBeDefined();
  expect(order.itemCount).toBeDefined();
  expect(order.floorPlanExists).toBeDefined();
  expect(order.date).toBeDefined();

  expect(totals.serviceFee).toBeDefined();
  expect(totals.subtotal).toBeDefined();
  expect(totals.tax).toBeDefined();
  expect(totals.total).toBeDefined();

  expect(totalsData.serviceFee).toBeDefined();
  expect(totalsData.subtotal).toBeDefined();
  expect(totalsData.tax).toBeDefined();
  expect(totalsData.total).toBeDefined();

  expect(item.id).toBeDefined();
  expect(item.name).toBeDefined();
  expect(item.quantity).toBeDefined();
  expect(item.advancedPrice).toBeDefined();
  expect(item.floorPrice).toBeDefined();
  expect(item.price).toBeDefined();
  expect(item.priceListId).toBeDefined();

  expect(order.isCompleted).toBeDefined();
  expect(order.billingId).toBeDefined();
  expect(order.exhibitorId).toBeDefined();

  expect(order.payment.last4).toBeDefined();
  expect(order.payment.type).toBeDefined();
  expect(order.payment.method).toBeDefined();
  expect(order.payment.amountPaid).toBeDefined();

  expect(order.personalInformation).toBeDefined();
  expect(order.companyInformation).toBeDefined();

  expect(order.isPending).toBeDefined();
  expect(order.isThirdParty).toBeDefined();
  expect(order.thirdPartyCompanyName).toBeDefined();
});
