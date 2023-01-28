export const gqlSchema = `

  type Document {
      itemKey: String!
      itemType: String!
      documentType: String!
  }

  type DiscountDefinition {
      discountKey: String!
      title: String!
      startTime: Date
      endTime: Date
      usageLimit: Int
      status: String!
      discountType: String
      discountPercentage: Float
      shopifyProductIDs: [String]
      appliesOncePerCustomer: Boolean!
      purposeNote: String
      products: [Product]
      isGatedShoppingInvite: Boolean
      isCampaign: Boolean
      campaignCodeExpiresAfterDays: Int
      campaignShouldAutofillEmail: Boolean
      grantSubscription: String
      grantFreeShipping: Boolean
      shareUrlPath: String
      netsuiteCohort: String
  }

  input DiscountInput {
      discountKey: String!
      startTime: String
      endTime: String
      usageLimit: Int
      amount: Float
      discountAmount: Float
      appliesOncePerCustomer: Boolean
      purposeNote: String
      updateProductList: String
      isGatedShoppingInvite: Boolean
      isCampaign: Boolean
      campaignCodeExpiresAfterDays: Int
      campaignShouldAutofillEmail: Boolean
  }


  type Trait {
      name: String!
      values: [TraitValue]!
  }

  type TraitValue {
      name: String
      description: String
  }

  type SelectedTrait {
      name: String!
      value: String!
  }

  type ProductCollection {
      productCollectionKey: String!
      handle: String!
      title: String!
      products: [Product]
      traits: [Trait]
  }

  type DocumentContent {
      documentName: String
      contentsJson: String
  }

  type ContentFilter {
      countries: [Country]
      product(productKey: String!): Product
      productByHandle(handle: String!): Product
      productByShopifyId(shopifyId: String!): Product

      collection(collectionKey: String!): ProductCollection
      discount(discountCode: String!): DiscountCode
      discountDefinition(discountCode: String!): DiscountDefinition
      sku(skuCode: String!): SKU
      skus(skuCodes: [String]!): [SKU]

      listDiscounts: [DiscountDefinition]
      listProducts: [Product]
      documents(documentNames: [String]!): [DocumentContent]

      featureFlags: [FeatureFlag]
      enabledFeatureFlags: [FeatureFlag]
      webRedirects: [WebRedirect]
      paymentGatewayConfig: [PaymentGatewayConfig]
  }

  type SKU {
      skuCode: String!
      ringSize: String
      productImages: [ProductImage]
      mainProductImage: ProductImage
      price: Price
      product: Product
  }

  type FeatureFlag {
      featureFlagKey: String!
      description: String
      enabled: Boolean!
  }

  input FeatureFlagInput {
      featureFlagKey: String!
      description: String
      enabled: Boolean
      enabledOnStaging: Boolean
      enabledOnProduction: Boolean
  }

  type PaymentGatewayConfig {
      gatewayName: String
      zuoraPaymentGateway: String
      zuoraPageId: String
      paypalMerchantId: String
  }

  type CountryMerchant {
      prod: String
      staging: String
  }

  type CountryRegions {
      label: String
      value: String
  }

  type ShippingRate {
      description: String
      price: Float
  }

  type Country {
      countryCode: String
      currency: String
      merchant: CountryMerchant
      eu: Boolean
      name: String
      regions: [CountryRegions]
      shipFrom: String
      shippingRate: ShippingRate
      freight_taxable: Boolean
      status: Boolean
      membershipStatus: Boolean
      calling_code: String
  }

  type WebRedirect {
      from: String
      to: String
  }
`;

/**
 GraphQL resolvers

 Each resolver is used when we have already fetched some object, and we want to fetch nested data
 inside that object.

 For example the query:

     discount(xxx) {
       products {
         ...
       }
     }

 would trigger the Discount.products resolver to fetch the data for related products.

 These are also used for 'namespace style' types like ContentFilter. For example the query:

     content {
       discount(xxx) {
       }
     }

 uses the ContentFilter.discount resolver. These resolvers are simpler because the ContentFilter
 object itself is empty, it's only used as a namespace.

*/
export const gqlResolvers = {
  DiscountDefinition: {
    products: {
      action: 'v1.content.productsForDiscount',
      rootParams: {
        discountKey: 'discountKey',
        contentFilter: 'contentFilter',
      },
    },
  },
  DiscountCode: {
    products: {
      action: 'v1.content.productsForDiscount',
      rootParams: {
        title: 'discountKey',
        contentFilter: 'contentFilter',
      },
    },
  },
  SKU: {
    price: {
      action: 'v1.content.priceForSku',
      rootParams: {
        skuCode: 'skuCode',
        contentFilter: 'contentFilter',
      },
    },
    product: {
      action: 'v1.content.productForSku',
      rootParams: {
        skuCode: 'skuCode',
        contentFilter: 'contentFilter',
      },
    },
    mainProductImage: {
      action: 'v1.content.mainProductImageForSku',
      rootParams: {
        skuCode: 'skuCode',
        contentFilter: 'contentFilter',
      },
    },
  },
  ProductCollection: {
    products: {
      action: 'v1.content.resolveProductsForCollection',
      rootParams: {
        productCollectionKey: 'productCollectionKey',
        contentFilter: 'contentFilter',
      },
    },
    traits: {
      action: 'v1.content.resolveTraitsForCollection',
      rootParams: {
        productCollectionKey: 'productCollectionKey',
        contentFilter: 'contentFilter',
      },
    },
  },
  ContentFilter: {
    countries: {
      action: 'v1.content.resolveCountries',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    product: {
      action: 'v1.content.resolveProductContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    productByHandle: {
      action: 'v1.content.findProductByHandle',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    productByShopifyId: {
      action: 'v1.content.findProductByShopifyId',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    collection: {
      action: 'v1.content.resolveCollectionContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    discount: {
      action: 'v1.content.resolveDiscountContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    discountDefinition: {
      action: 'v1.content.resolveDiscountDefinition',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    sku: {
      action: 'v1.content.resolveSkuContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    skus: {
      action: 'v1.content.resolveSkusContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    listDiscounts: {
      action: 'v1.content.resolveListDiscountsContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    listProducts: {
      action: 'v1.content.resolveListProductsContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    documents: {
      action: 'v1.content.resolveFetchContentDocuments',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    featureFlags: {
      action: 'v1.content.resolveFeatureFlagsContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    enabledFeatureFlags: {
      action: 'v1.content.resolveEnabledFeatureFlagsContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    webRedirects: {
      action: 'v1.content.resolveWebRedirectsContent',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
    paymentGatewayConfig: {
      action: 'v1.content.resolvePaymentGatewayConfig',
      rootParams: {
        contentFilter: 'contentFilter',
      },
    },
  },
  Product: {
    variants: {
      action: 'v1.content.resolveVariantsForProduct',
      rootParams: {
        productKey: 'productKey',
        contentFilter: 'contentFilter',
      },
    },
  },
};
