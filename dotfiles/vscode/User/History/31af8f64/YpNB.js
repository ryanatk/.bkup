import { getItem } from 'data/utils';
import { getAssessment, getTotals } from 'data/utils';
import { PAYMENT_METHOD } from 'common/const';

const getOrder = (data = {}) => {
  // console.log('!getOrder', { data });

  const ccString = data.orderPaymentDetails?.last4digit;
  const last4 = ccString?.substring(ccString?.length - 4);

  const method =
    data.paymentType !== (PAYMENT_METHOD.ACH && PAYMENT_METHOD.WIRE)
      ? PAYMENT_METHOD.CARD
      : data.paymentType;

  return {
    boothNum: data.boothNumber, // TODO: remove (redundant with `boothNumber`, but both are being used)
    boothNumber: data.boothNumber,
    id: data?.id?.toString(),
    eventId: data.eventID,
    eventName: data.eventName,
    itemCount: data.items.reduce((count, { quantity }) => count + quantity, 0),
    floorPlanExists: data.floorPlanExists,
    date: data.orderDate,
    totalsData: getTotals(data.totals), // TODO: remove (redundant with `totals`, but both are being used)
    totals: getTotals(data.totals),
    orderTotal: data.orderTotal,
    items: data.items.map(getItem),
    isCompleted: data.isCompleted,
    billingId: data.billinghAddID,
    exhibitorId: data.exhAddID,
    isPending: data.orderStatus === 'Pending',
    isThirdParty: data.isThirdParty,
    thirdPartyCompanyName: data.thirdPartyExhibitorCompanyName,
    payment: {
      last4,
      type: data.orderPaymentDetails?.type,
      method,
      amountPaid: data.orderPaymentDetails?.amount,
    },
    assessmentResponseData: data.orderAssessmentResponseData.map(getAssessment),
    personalInformation: {
      firstName: data.personalInformation?.firstName,
      lastName: data.personalInformation?.lastName,
      mobile: data.personalInformation?.addressInformation?.mobile,
      email: data.personalInformation?.emailAddress,
      addressInformation: data.personalInformation?.addressInformation,
    },
    companyInformation: {
      name: data.companyInformation?.name,
      address: data.companyInformation?.address,
      phone: data.companyInformation?.address?.phone,
    },
  };
};

export default getOrder;
