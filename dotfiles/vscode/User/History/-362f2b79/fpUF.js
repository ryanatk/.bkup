import { PAYMENT_METHOD } from 'common/const';

export const customerId = '8c3c3a01-5535-4ee8-ab13-ca07b1a51fe5';
export const eventId = '032001ZZ';
export const itemId = 1001;
export const priceListId = '1de0cc05-5e8a-4c70-bb57-0b954e07f096';
export const ooSummaryId = 7;
export const boothNum = '7';
export const responseId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const cartId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const documentId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const packageItemId = 27;
export const countryId = 1; // United States
export const linkCode =
  '498510C4-4733-4FB9-8C1A-638C4C220EF7;CB125744-EE63-4191-84A0-390F8C62C5A7';
export const ownership = 'Edlen';

// Params
export const registerParams = {
  emailAddress: 'codingscapejoetest1@gmail.com',
  password: 'Passw0rd!',
  firstName: 'Test',
  lastName: 'User',
  company: 'CodingScape',
  phone: '555-867-5309',
  countryCode: 'USA',
  address1: '123 First St.',
  address2: null,
  city: 'Las Vegas',
  state: 'NV',
  zip: '89000',
  isSystemAccount: false,
  subscribeNewsletter: false,
  lastIpAddress: '127.0.0.1',
  ownership: 'Edlen',
};

export const registerExpectedParams = {
  theData: {
    emailAddress: 'codingscapejoetest1@gmail.com',
    password: 'Passw0rd!',
    firstName: 'Test',
    lastName: 'User',
    addressInformation: {
      address1: '123 First St.',
      address2: null,
      city: 'Las Vegas',
      countryCode: 'USA',
      phone: '555-867-5309',
      state: 'NV',
      type: 'Customer',
      zip: '89000',
    },
    companyInformation: {
      address: {
        address1: '123 First St.',
        address2: null,
        city: 'Las Vegas',
        countryCode: 'USA',
        phone: '555-867-5309',
        state: 'NV',
        type: 'Customer',
        zip: '89000',
      },
      name: 'CodingScape',
      users: [],
    },
  },
  siteOwnership: 'Edlen',
};

// Responses
export const ooId = 7;
export const merchantId = 'edlenelect';
export const exhAddId = '90f1ca84-ee1b-4296-ae76-e681c2b63d20';
export const billingAddId = '90f1ca84-ee1b-4296-ae76-e681c2b63d20';
export const addressId = '076d0884-967a-45c5-bfde-52b3b792d4af';

// Results
export const resultData = {
  actionResult: 'Successful',
  actionText: 'string',
  displayMessage: 'string',
};

export const boothData = {
  boothID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  dimensions: 'string',
  groupLocation: 'string',
  location: 'string',
  number: 'string',
  orderID: 0,
  size: 'string',
  type: 'string',
};

export const cartTotal = {
  creditCardProcessingFee: 0,
  grandTotal: 0,
  serviceFeeTotal: 0,
  subTotal: 0,
  taxTotal: 0,
  wireTransferFee: 0,
};

export const wireTransferFee = 9.75;

export const suggestedItems = [
  {
    childDescription: 'string',
    childItemID: 0,
    childItemQty: 0,
    childPriceListID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    parentItemID: 0,
    parentPriceListID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  },
];

export const requiredItems = [
  {
    childCategory: 'string',
    childItemDescription: 'string',
    childItemID: 0,
    childPriceListID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    childRequiredQty: 0,
    childSubCategory: 'string',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    parentCategory: 'string',
    parentItemID: 0,
    parentMaxQty: 0,
    parentMinQty: 0,
    parentPriceListID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    parentSubCategory: 'string',
  },
];

export const pricesData = [
  {
    itemPrice: 10,
    priceType: 'string',
  },
  {
    itemPrice: 11,
    priceType: 'string',
  },
];

export const catalogItem = {
  categoryID: 1,
  deptNum: 2,
  discountPercentage: 3,
  includeServiceFee: true,
  isPrimaryImageFlag: true,
  itemDescription: 'outlet',
  itemID: itemId,
  itemLongDescription: 'big outlet',
  picturePath: 'picturePath',
  price: pricesData,
  priceListID: priceListId,
  quantity: 0,
  requiredItems: requiredItems,
  subCategoryID: 0,
  suggestedItems: suggestedItems,
  isTaxable: true,
  onlinePriceLevel: 'string',
};

export const subCategoryData = {
  creationDate: '2022-02-09T00:04:26.193Z',
  deletionDate: '2022-02-09T00:04:26.193Z',
  description: 'string',
  id: 0,
  items: [catalogItem],
  longDescription: 'string',
  name: 'string',
};

export const eventCatalog = [
  {
    creationDate: '2022-02-09T00:04:26.193Z',
    deletionDate: '2022-02-09T00:04:26.193Z',
    description: 'string',
    id: 0,
    longDescription: 'string',
    name: 'string',
    subCategories: [subCategoryData],
  },
];

export const branchData = {
  addressLine1: '1 St. Clair Avenue NE',
  addressLine2: '',
  assigned: false,
  city: 'Cleveland',
  code: 'CL',
  comments: '',
  company: 'Edlen',
  country: 'US',
  dateCreated: '2013-02-19T14:49:51.49',
  dateLastModified: '2021-11-18T14:57:54.497',
  description: null,
  emotLaborRate: 0,
  emstLaborRate: 0,
  elecOTLaborRate: 0,
  elecSTLaborRate: 0,
  email: 'exhibitorservices-cleveland@edlen.com',
  fax: '2169281541',
  hasPositionsAvail: false,
  id: 23,
  merchantID: merchantId,
  name: 'Edlen Electrical Exhibition Services Cleveland',
  overheadPerc: 0,
  phone: '2169281540',
  providerSource: 'Undefined',
  state: 'OH',
  wareOTLaborRate: 0,
  wareSTLaborRate: 0,
  zip: '44114',
};

export const facilityData = {
  addressLine1: '1 St. Clair Avenue NE',
  addressLine2: '',
  branchID: 23,
  branchInfo: branchData,
  city: 'Cleveland',
  city_Tax: 0,
  comments: '',
  country: 'USA',
  dateCreated: '2013-02-19T14:54:05.197',
  dateLastModified: '2013-02-19T14:54:05.197',
  deactivationDate: '0001-01-01T00:00:00',
  facilityAKA: 'HCC',
  facilityImageURL: null,
  facilityName: 'Huntington Convention Center of Cleveland',
  facilityTypes: null,
  facility_Contact: '',
  facility_Contact_Email: '',
  facility_Contact_Phone: '',
  facility_Contact_Title: '',
  fax: '',
  fee: 0,
  id: 620,
  isPremierFacility: false,
  isValid: false,
  phone: '(216) 928-1600',
  providerSource: 'Undefined',
  removedFromWEbSite: false,
  sales_Tax: 8,
  serviceFee: 0,
  serviceFeeInfo: null,
  state: 'OH',
  status: null,
  website: 'http://www.clevelandconventions.com',
  yearEnd: '04/30',
  yearStart: '05/01',
  zip: '44114',
};

export const eventData = [
  {
    webServerDateTime: '2022-01-01T00:00:00',
    aka: '',
    cityTax: 0,
    closeDate: '2022-02-20T00:00:00',
    closeDay: null,
    deadLineDate: '2022-01-26T00:00:00',
    facilityInfo: facilityData,
    id: '022001CL',
    logoPath: null,
    miscTax1: 0,
    miscTax2: 0,
    name: 'NBA 2022',
    openDate: '2022-02-16T00:00:00',
    openDay: null,
    parent: false,
    providerSource: 'SQL',
    salesTax: 8,
    serviceFeeRate: 0,
    status: 'Active    ',
    tnCPath: null,
    websiteURL: null,
    isOOAvailable: true,
    isOOFormsAvailable: false,
    isServiceFeeTaxable: false,
    isTaxExempt: false,
  },
];

export const paymentData = {
  accountNumber: 'string',
  accountNumberExpMM: 'string',
  accountNumberExpYY: 'string',
  address1: 'string',
  address2: 'string',
  amount: 0,
  city: 'string',
  companyName: 'string',
  country: 'string',
  date: '2022-02-11T00:04:10.228Z',
  firstName: 'string',
  ip: 'string',
  last4digit: 'string',
  lastName: 'string',
  nameOnCard: 'string',
  state: 'string',
  status: 'string',
  type: 'string',
  zip: 'string',
  email: 'string',
  isGuaranteedCard: false,
};

export const addressData = {
  address1: 'string',
  address2: 'string',
  city: 'string',
  countryCode: 'string',
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  phone: 'string',
  state: 'string',
  type: 'All',
  zip: 'string',
};

export const companyData = {
  address: {
    address1: 'string',
    address2: 'string',
    city: 'string',
    countryCode: 'string',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    phone: 'string',
    state: 'string',
    type: 'All',
    zip: 'string',
  },
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  name: 'string',
  users: [
    {
      addressInformation: addressData,
      companyInformation: 'string',
      creationDate: '2022-02-11T00:04:10.228Z',
      deletionDate: '2022-02-11T00:04:10.228Z',
      emailAddress: 'string',
      failedAttempts: 0,
      firstName: 'string',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      isTempPassword: true,
      lastLoginDate: '2022-02-11T00:04:10.228Z',
      lastName: 'string',
      modificationDate: '2022-02-11T00:04:10.228Z',
      password: 'string',
      resultInformation: {
        actionResult: 'Successful',
        actionText: 'string',
        displayMessage: 'string',
      },
      siteOwnership: 'Undefined',
      tempPasswordExpirationDate: '2022-02-11T00:04:10.228Z',
    },
  ],
};

export const customerData = {
  addressInformation: addressData,
  companyInformation: companyData,
  creationDate: '2022-02-11T00:04:10.228Z',
  deletionDate: '2022-02-11T00:04:10.228Z',
  emailAddress: 'string',
  failedAttempts: 0,
  firstName: 'string',
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  isTempPassword: true,
  lastLoginDate: '2022-02-11T00:04:10.228Z',
  lastName: 'string',
  modificationDate: '2022-02-11T00:04:10.228Z',
  password: 'string',
  resultInformation: resultData,
  siteOwnership: 'Undefined',
  tempPasswordExpirationDate: '2022-02-11T00:04:10.228Z',
};

export const cartData = [
  {
    cityTaxRate: 0,
    customerID: customerId,
    eventID: eventId,
    eventItemDependencyID: '00000000-0000-0000-0000-000000000000',
    eventItemGroupID: 0,
    id: '00000000-0000-0000-0000-000000000000',
    includeServiceFee: false,
    isAutoAdded: false,
    itemDescription: 'Item Name',
    itemID: itemId,
    miscTaxRate1: 0,
    miscTaxRate2: 0,
    onlineOrderID: 0,
    orderDate: '0001-01-01T00:00:00',
    ordersDetailID: '00000000-0000-0000-0000-000000000000',
    price: 0,
    priceListID: priceListId,
    prices: pricesData,
    quantity: 1,
    salesTaxRate: 0,
    serviceFeeRate: 0,
    taxRate: 0,
    taxable: false,
  },
];

export const orderAssessmentResponseData = [
  {
    assessmentQ_ID: 0,
    assessmentType: 'string',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    question: 'string',
    response: '1',
    templateTypeID: 1,
  },
  {
    assessmentQ_ID: 0,
    assessmentType: 'string',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    question: 'string',
    response: 'unsure',
    templateTypeID: 2,
  },
  {
    assessmentQ_ID: 0,
    assessmentType: 'string',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    question: 'string',
    response: '',
    templateTypeID: 3,
  },
  {
    assessmentQ_ID: 0,
    assessmentType: 'string',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    question: 'string',
    response: '4 x 8',
    templateTypeID: 4,
  },
];

export const itemsList = [
  {
    // 1st item
    categoryDescription: 'Electrical',
    isAutoAdded: false,
    itemDescription: 'Small Outlet',
    itemID: 1001,
    price: 10,
    prices: [{ itemPrice: 10 }, { itemPrice: 11 }],
    quantity: 1,
  },
  {
    // 2nd item
    categoryDescription: 'Electrical',
    isAutoAdded: false,
    itemDescription:
      'Giant Outlet with Required Labor and a Really Long Name and Not On Sale',
    itemID: 1002,
    price: 10,
    prices: [{ itemPrice: 10 }, { itemPrice: 10 }],
    quantity: 1,
  },
  {
    // required labor
    categoryDescription: 'Labor',
    associatedCategoryDescription: 'Electrical',
    isAutoAdded: true, // will this be true?
    itemDescription: 'Big Old Labor',
    itemID: 4001,
    price: 10,
    prices: [{ itemPrice: 10 }, { itemPrice: 11 }],
    quantity: 1,
  },
  {
    // 2nd category
    categoryDescription: 'Lighting',
    isAutoAdded: false,
    itemDescription: 'Big Lamp',
    itemID: 2001,
    price: 199,
    prices: [{ itemPrice: 199 }, { itemPrice: 250 }],
    quantity: 789,
  },
  {
    // 2nd category required
    categoryDescription: 'Labor',
    associatedCategoryDescription: 'Lighting',
    isAutoAdded: true,
    itemDescription: 'Labor Required for Big Lamp',
    itemID: 4001, // the same as the other labor item, to ensure we set a key properly
    price: 10,
    prices: [{ itemPrice: 10 }, { itemPrice: 11 }],
    quantity: 1,
  },
  {
    // package (1st category)
    categoryDescription: 'Electrical',
    isAutoAdded: false,
    itemDescription: 'Package of Things',
    itemID: 99001,
    price: 10,
    prices: [{ itemPrice: 10 }, { itemPrice: 11 }],
    quantity: 1,
  },
  {
    // free package (1st category)
    categoryDescription: 'Electrical',
    isAutoAdded: true, // will this be true?
    itemDescription: 'Free Package of Things',
    itemID: 99002,
    price: 0,
    prices: [{ itemPrice: 0 }, { itemPrice: 0 }],
    quantity: 1,
  },
];

export const incompleteOrders = [
  {
    boothData,
    cartDetails: cartData,
    cartTotal,
    eventID: eventId,
    eventName: 'string',
    ooSummaryID: ooSummaryId,
    orderAssessmentResponseData,
    orderDate: '2022-02-11T00:21:33.551Z',
  },
];

export const completedOrders = [
  {
    billinghAddID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    boothData,
    companyAddressID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    companyID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    companyInformation: companyData,
    empOrderID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    eventID: eventId,
    eventName: 'string',
    exhAddID: exhAddId,
    floorPlanExists: true,
    isThirdParty: true,
    oO_ID: 0,
    orderAssessmentResponseData,
    orderDate: '2022-02-11T00:04:10.228Z',
    orderDetailTotals: cartTotal,
    orderDetails: cartData,
    orderPaymentDetails: paymentData,
    orderStatus: 'string',
    orderTotal: 0,
    orderby_CustomerName: 'string',
    personalInformation: customerData,
    thirdPartyExhibitorCompanyName: 'string',
  },
];

export const paymentResponse = {
  resultInformation: resultData,
  paymentResult: 'Successful',
};

// Params
export const paymentInputParams = {
  contact: {
    address1: '111 las vegas blvd',
    address2: null,
    city: 'Las Vegas',
    company: 'CodingScape',
    countryCode: 'US',
    creationDate: '2021-11-22T09:23:49.827',
    customerID: '7ac415d4-5ce0-42be-974b-681e8259e854',
    deletionDate: '0001-01-01T00:00:00',
    failedAttempts: 0,
    fax: null,
    firstName: 'Test',
    isAuthenticated: false,
    isSystemAccount: false,
    isTempPassword: false,
    lastIPAddress: '::1',
    lastLoginDate: '2021-11-22T09:23:49.827',
    lastName: 'User',
    mobile: null,
    modificationDate: '2021-11-22T09:23:49.827',
    ownership: 'Edlen',
    password:
      '"ALcPGRVXsE+htOKjhRdwCQEAAADuaYPbC8c+N0JR/MTLAQFA/yAEq4ZpKhavPBoME+l61A=="',
    phone: '1111111111',
    state: 'NV',
    subscribeToNewsletter: false,
    tempPwdExpirationDate: '0001-01-01T00:00:00',
    zip: '89012',
    email: 'testing1@gmail.com',
    companyName: 'Codingscape',
    type: 'Exhibitor',
    customerId: '7ac415d4-5ce0-42be-974b-681e8259e854',
    addressId: 'df9296bb-9dd3-40f1-8186-c08b8e0d02b8',
    isThirdParty: 'No',
    exhibitorInfo: 'Acme Inc.',
  },
  payment: paymentData,
  completedSteps: {},
  isDone: true,
  buttonText: 'Save',
  paymentData: {
    countryCode: 'US',
    name: 'First Last',
    accountNumber: '4111111111111111',
    expiration: '12/22',
    cvv: '123',
    firstName: 'First',
    lastName: 'Last',
    address1: '111 las vegas blvd',
    address2: '',
    city: 'Las Vegas',
    state: 'NV',
    zip: '88888',
    method: PAYMENT_METHOD.CARD,
    type: 'Billing',
    customerId,
    addressId,
    isGuaranteedCard: false,
  },
  ooSummaryId: ooId,
  customerId,
  merchantId,
  eventId,
  isThirdParty: false,
  thirdPartyName: 'Acme Inc.',
  isGuaranteedCard: false,
  exhibitorAddressId: exhAddId,
  billingAddressId: billingAddId,
  totalsData: {
    serviceFee: 0,
    subtotal: 497,
    tax: 0,
    total: 497,
  },
  date: '2022-02-11',
};

export const expectedProcessPaymentParams = {
  paymentData: {
    country: 'US',
    nameOnCard: 'First Last',
    accountNumber: '4111111111111111',
    accountNumberExpMM: '12',
    accountNumberExpYY: '22',
    cvv: '123',
    firstName: 'First',
    lastName: 'Last',
    address1: '111 las vegas blvd',
    address2: '',
    email: 'testing1@gmail.com',
    companyName: 'Codingscape',
    city: 'Las Vegas',
    state: 'NV',
    zip: '88888',
    paymentType: 'VISA',
    type: 'VISA',
    last4Digit: '1111',
    status: 'active',
    amount: paymentInputParams.totalsData.total,
    isGuaranteedCard: false,
  },
  ooId,
  customerId,
  eventId,
  merchantId,
  exhAddId,
  billingAddId,
  thirdPartyName: 'Acme Inc.',
  isThirdParty: false,
  isGuaranteedCard: false,
};

export const getEventAssessmentList = [
  {
    defaultBranchAssessmentQVisibilityRulesID:
      '00000000-0000-0000-0000-000000000000',
    defaultFacilityAssessmentQVisibilityRulesID:
      '00000000-0000-0000-0000-000000000000',
    eventAssessmentQVisibilityRuleID: '5642b507-617c-4404-a9de-fa9f0b1477f6',
    id: 1,
    isDeleted: false,
    isResponseOptional: true,
    isVisible: true,
    itemInclusions: [],
    question: 'What is your booth number?',
    responseSelections: null,
    responseStoredProcedure: null,
    responseTypeDesc: null,
    responseTypeID: 1,
    sortOrder: 1,
    templateTypeID: 1,
    type: 'Booth Set-up',
    typeID: 1,
    userResponse: null,
    userResponseDate: '0001-01-01T00:00:00',
  },
  {
    defaultBranchAssessmentQVisibilityRulesID:
      '00000000-0000-0000-0000-000000000000',
    defaultFacilityAssessmentQVisibilityRulesID:
      '00000000-0000-0000-0000-000000000000',
    eventAssessmentQVisibilityRuleID: 'f360afbf-7e45-4902-87b3-3affac097884',
    id: 2,
    isDeleted: false,
    isResponseOptional: false,
    isVisible: true,
    itemInclusions: [],
    question: 'What type of booth are you building?',
    responseSelections: [
      {
        id: '651d86ef-f06e-4a90-8b1a-e99971c9c7c2',
        text: 'Inline',
      },
      {
        id: '6b8c3730-c526-4dd3-949f-631d5f43c020',
        text: 'Island',
      },
      {
        id: '9f14e95d-8b2a-40b2-bfe1-57ace89effaa',
        text: 'Peninsula',
      },
      {
        id: '6103c868-8b5e-43b8-a892-133ca9d9082f',
        text: 'Lobby',
      },
      {
        id: 'c2eb4c45-2c5d-4ea6-a694-457903f8601b',
        text: 'Table Top',
      },
      {
        id: '3540fa01-5706-4822-b8d3-b4f2b89de19f',
        text: 'Meeting Room',
      },
      {
        id: 'e0c848ee-7ee4-46cc-b081-94778c097270',
        text: 'Outside',
      },
      {
        id: 'f240ac46-d7f6-48fd-aa7a-36538575a367',
        text: 'Do Not Know',
      },
    ],
    responseStoredProcedure: null,
    responseTypeDesc: null,
    responseTypeID: 2,
    sortOrder: 2,
    templateTypeID: 2,
    type: 'Booth Set-up',
    typeID: 1,
    userResponse: null,
    userResponseDate: '0001-01-01T00:00:00',
  },
  {
    defaultBranchAssessmentQVisibilityRulesID:
      '00000000-0000-0000-0000-000000000000',
    defaultFacilityAssessmentQVisibilityRulesID:
      '00000000-0000-0000-0000-000000000000',
    eventAssessmentQVisibilityRuleID: 'f7fb76be-4dfc-4b76-8d3d-4c150cb808e6',
    id: 3,
    isDeleted: false,
    isResponseOptional: false,
    isVisible: true,
    itemInclusions: [],
    question: 'Where is your booth located?',
    responseSelections: [],
    responseStoredProcedure: null,
    responseTypeDesc: null,
    responseTypeID: 2,
    sortOrder: 3,
    templateTypeID: 3,
    type: 'Booth Set-up',
    typeID: 1,
    userResponse: null,
    userResponseDate: '0001-01-01T00:00:00',
  },
  {
    defaultBranchAssessmentQVisibilityRulesID:
      '00000000-0000-0000-0000-000000000000',
    defaultFacilityAssessmentQVisibilityRulesID:
      '00000000-0000-0000-0000-000000000000',
    eventAssessmentQVisibilityRuleID: '6509b1f8-310e-4f8c-8f31-c46ccd9f374e',
    id: 4,
    isDeleted: false,
    isResponseOptional: true,
    isVisible: true,
    itemInclusions: [],
    question: 'What is the size of your booth?',
    responseSelections: null,
    responseStoredProcedure: null,
    responseTypeDesc: null,
    responseTypeID: 1,
    sortOrder: 4,
    templateTypeID: 4,
    type: 'Booth Set-up',
    typeID: 1,
    userResponse: null,
    userResponseDate: '0001-01-01T00:00:00',
  },
];

export const bankData = {
  acH_ABA: 'string',
  acH_AccountNumber: 'string',
  acH_Address: 'string',
  acH_Bank: 'string',
  acH_Phone: 'string',
  wirE_ABA: 'string',
  wirE_AccountNumber: 'string',
  wirE_Bank: 'string',
  wirE_SWIFT: 'string',
};

export const packageData = [
  {
    autoAdd: false,
    categoryGroup: 'Electrical Labor',
    categoryID: 4,
    id: 99002,
    isAvailableOnline: true,
    isEnabled: true,
    longDescription:
      'One (1) 500 Watt Outlet, distribution material and labor included. One package per location must be ordered. Power cannot be split.',
    maxQty: 999999,
    minQty: 1,
    name: '500 Watt Outlet Distribution Package',
    packageItems: [],
    picturePath: '500-watt-package.png',
    prices: [
      {
        itemPrice: 0.16,
        priceType: 'Advance',
      },
      {
        itemPrice: 0.32,
        priceType: 'Floor',
      },
    ],
    shortDescription:
      'One (1) 500 Watt Outlet, distribution material and labor included.',
    subCategoryGroup: 'Electrical Labor',
    subCategoryID: 18,
  },
];

export const itemData = [
  {
    categoryID: 0,
    deptNum: 0,
    discountPercentage: 0,
    includeServiceFee: true,
    isPrimaryImageFlag: true,
    itemDescription: 'string',
    itemID: 0,
    itemLongDescription: 'string',
    itemShortDescription: 'string',
    picturePath: 'string',
    price: pricesData,
    priceListID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    quantity: 0,
    requiredItems,
    subCategoryID: 0,
    suggestedItems,
    isTaxable: true,
    onlinePriceLevel: 'string',
  },
];

export const paymentMethodData = [
  {
    id: 1,
    method: 'CC',
    name: 'VISA',
  },
  {
    id: 2,
    method: 'CC',
    name: 'MASTERCARD',
  },
  {
    id: 3,
    method: 'CHECK',
    name: 'CHECK',
  },
  {
    id: 4,
    method: 'CC',
    name: 'AMEX',
  },
  {
    id: 5,
    method: 'CASH',
    name: 'CASH',
  },
  {
    id: 6,
    method: 'CC',
    name: 'DINERS',
  },
  {
    id: 7,
    method: 'CC',
    name: 'DISCOVER',
  },
  {
    id: 8,
    method: 'WOFF',
    name: 'WRITE OFF',
  },
  {
    id: 9,
    method: 'CR',
    name: 'CREDIT',
  },
  {
    id: 10,
    method: 'SETTLE',
    name: 'SETTLEMENT',
  },
  {
    id: 11,
    method: 'COMMISSION',
    name: 'COMMISSION',
  },
  {
    id: 12,
    method: 'ACH',
    name: 'ACH',
  },
  {
    id: 13,
    method: 'WIRE TRANSFER',
    name: 'WIRE TRANSFER',
  },
  {
    id: 14,
    method: 'FEE',
    name: 'PROCESSING FEE',
  },
];

export const states = [
  {
    abbreviation: 'AA',
    id: 1,
    name: 'AA (Armed Forces Americas)',
  },
  {
    abbreviation: 'AE',
    id: 2,
    name: 'AE (Armed Forces Europe)',
  },
];

export const countries = [
  {
    id: 2,
    name: 'Canada',
    numericIsoCode: 124,
    states: [
      {
        abbreviation: 'AB',
        id: 63,
        name: 'Alberta',
      },
      {
        abbreviation: 'BC',
        id: 64,
        name: 'British Columbia',
      },
    ],
    threeLetterIsoCode: 'CAN',
    twoLetterIsoCode: 'CA',
  },
  {
    id: 3,
    name: 'Argentina',
    numericIsoCode: 32,
    states: [],
    threeLetterIsoCode: 'ARG',
    twoLetterIsoCode: 'AR',
  },
];

export const appVersion = 'M.O.C.K';

export const maxCreditCardAmount = 99999.99;

export const doesShoppingCartExist = 0;
export const expectedDocuments = {
  documents: [
    {
      id: documentId,
    },
  ],
};
