import { fetchProducts } from '../queries/Products';
import { CartLineItem } from '../types/CartState';
import { ProductImage } from '../types/Product';
import logToDatadog from '../utils/logToDatadog';
import { DiscountValue } from './helpers/cartHelpers';

const sizingKitId = 21266804768822;

// OPTIMIZE: review logic and Normalize code (WB)

export default function ProductService(state) {
  const cart = state.cart;

  // Build a product object
  const product = (productData) => {
    const data = {
      id: productData.id,
      handle: productData.handle,
      title: productData.title,
      description: productData.description,
      images: images(productData.productImages, productData.title),
      variants: fixVariantsList(
        productData,
        productData.variants,
        productData.id,
      ),
      options: productData.productOptions,
    };
    //
    return data;
  };

  const fixVariantsList = (productData, variantList, productId) => {
    const data = [];
    for (let i = 0; i < variantList.length; i++) {
      const fixedVariant = {
        id: variantList[i].id,
        available: variantList[i].available,
        price: productData.price.amount,
        unitPrice: productData.price.amount,
        productId: productId,
        sku: variantList[i].sku,
        image: images(variantList[i].productImages),
        selectedOptions: variantList[i].selectedOptions,
        discounts: variantList[i].discounts,
      };

      data.push(fixedVariant);
    }
    //
    return data;
  };

  async function variantToLineItem(
    obj,
    productId,
    parent,
    quantity,
    discount,
    parentId = null,
  ) {
    let totalDiscountPrice = discount.value ? discount.value * quantity : 0;
    //Free subscription
    const ringCount = getRingCount();

    if (parseFloat(obj.id) === sizingKitId) {
      const sizingDiscount = 5;
      totalDiscountPrice = quantity * sizingDiscount;

      if (quantity > ringCount) {
        totalDiscountPrice = ringCount * sizingDiscount;
      }
    }

    const itemUnitPrice = parent.price.amount;
    const itemPrice = itemUnitPrice * quantity;
    const data = {
      title: parent.title,
      id: obj.id,
      productType: parent.product_type,
      available: obj.available,
      unitPrice: itemUnitPrice,
      price: itemPrice,
      totalDiscountPrice: totalDiscountPrice,
      productId: productId,
      sku: obj.sku,
      image: images(parent.images),
      selectedOptions: obj.selectedOptions,
      quantity,
      discounts: discount,
      parentId,
    };

    return data;
  }

  const getRingCount = () => {
    let count = 0;
    for (let i = 0; i < cart.lineItems.length; i++) {
      // newCart[i].title === 'Sizing Kit' || newCart[i].title === 'Charger Set'
      if (
        cart.lineItems[i].title === 'Oura Sizing Kit' ||
        cart.lineItems[i].title === 'Charger Set' ||
        cart.lineItems[i].title === 'Oura Membership'
      ) {
        // do nothing
      } else {
        count += cart.lineItems[i].quantity;
      }
    }
    return count;
  };

  //
  //
  const images = (images, title = null): ProductImage[] => {
    const data: ProductImage[] = [];
    //
    for (let i = 0; i < images.length; i++) {
      data.push({
        originalSrc: images[i].originalSrc,
        alt: title,
        width: images[i].width,
        height: images[i].height,
      });
    }
    return data;
  };

  // Returns a single product, by ID
  //
  async function getProductByIdFromVariant(variantId) {
    const rings = await getAllProducts();

    let productId = '';
    for (let i = 0; i < rings.length; i++) {
      for (let ii = 0; ii < rings[i].variants.length; ii++) {
        if (parseFloat(rings[i].variants[ii].id) === parseFloat(variantId)) {
          productId = rings[i].id;
        }
      }
    }

    if (!productId || productId === '') {
      logToDatadog('product', 'No product found for supplied variant ID.', {
        variantId,
      });
    }

    return productId;
  }

  async function getAllProducts(formatted = true, selectedCountry = null) {
    const products = await fetchProducts({
      region: selectedCountry?.countryCode,
      currency: state.app.currency,
    });
    return products;
  }

  // Returns a single product, by handle
  //
  async function getProductByHandle(handle: string) {
    const rings = await getAllProducts();

    let obj = {};
    for (let i = 0; i < rings.length; i++) {
      if (rings[i].handle === handle) {
        obj = product(rings[i]);
      }
    }
    return obj;
  }

  // Returns a single product, by ID
  //
  async function getProductByIdSelector(id) {
    const rings = await getAllProducts();

    let obj = {};
    for (let i = 0; i < rings.length; i++) {
      if (parseInt(rings[i].id) === parseInt(id)) {
        obj = product(rings[i]);
      }
    }
    return obj;
  }

  // Returns a line item for a single product. Used when adding a product to cart.
  async function getProductAsLineItem({
    variantId,
    quantity,
    discount,
    parentId = null,
  }: {
    variantId?: number | string;
    quantity: number;
    discount: DiscountValue;
    parentId: string | null;
    productType: string;
  }): Promise<CartLineItem> {
    const rings = await getAllProducts();

    const result: any = {};

    for (let i = 0; i < rings.length; i++) {
      for (let b = 0; b < rings[i].variants.length; b++) {
        if (parseInt(rings[i].variants[b].id) === parseInt(variantId as any)) {
          const productVariant = await variantToLineItem(
            rings[i].variants[b],
            rings[i].id,
            rings[i],
            quantity,
            discount,
            parentId,
          );
          return productVariant;
        }
      }
    }

    logToDatadog(
      'product',
      'No product found for supplied variant ID when getting product as a line item.',
      {
        variantId,
      },
    );

    return result;
  }

  // Get A single Product
  // This method, checks both handle | ID
  //
  async function getSingleProduct(identifier) {
    const data = getProductByIdSelector(identifier);

    if ((data as any).id) {
      // This branch is probably impossible? Because getProductByIdSelector returns a promise
      // which doesn't have '.id'
      logToDatadog(
        'product',
        "internal error - didn't expect this code path in productService",
      );
      return data;
    } else {
      return getProductByHandle(identifier);
    }
  }

  return {
    getAllProducts,
    getProductByIdSelector,
    getProductByHandle,
    getProductAsLineItem,
    getSingleProduct,
    getProductByIdFromVariant,
  };
}
