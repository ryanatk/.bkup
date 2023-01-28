import { isPlainObject, merge } from 'lodash';

import { ADD_INCREMENT } from './const';
import { getUpdateIncrement } from './utils';

/**
 * Mutate item data for naming readability,
 * and deep merge with optional overrides & defaults,
 * @param {object} itemData - item data from the server
 * @param {object} [overrides]
 * @param {object} [defaults]
 * @returns {object}
 */
const getItem = (itemData, overrides = {}, defaults = {}) => {
  // if (overrides === true) {
  // console.log('!getItem', { itemData });
  // }

  // important checks when fn is used as callback for Array.map
  const overridesObject = isPlainObject(overrides) ? overrides : {};
  const defaultsObject = isPlainObject(defaults) ? defaults : {};

  const reshape = (obj) => {
    const [advancedPrice, floorPrice] = Array.isArray(obj.price)
      ? obj.price
      : obj.prices ?? [{ itemPrice: undefined }, { itemPrice: undefined }]; // sometimes we don't get prices...

    const id = obj.itemID ?? obj.itemId ?? obj.id;
    const isPackage = id > 99000;

    return {
      cartId: obj.id,
      id,
      name: obj.itemDescription ?? obj.name,
      image: obj.picturePath ?? obj.imageName,
      quantity: obj.quantity,
      ooSummaryId: obj.ooSummaryID,
      advancedPrice: advancedPrice.itemPrice,
      floorPrice: floorPrice.itemPrice ?? advancedPrice.itemPrice,
      price: obj.price,
      priceListId: obj.priceListID ?? obj.priceListId,
      addIncrement: ADD_INCREMENT[id] ?? 1,
      updateIncrement: getUpdateIncrement(id),
      category: obj.categoryDescription ?? obj.categoryGroup,
      associatedCategory: Boolean(obj.associatedCategoryDescription) // associatedCategory is returned as an empty string, when not required
        ? obj.associatedCategoryDescription
        : undefined,
      isRequired: obj.isAutoAdded ?? obj.autoAdd,
      isPackage,
      min: obj.minQty,
      max: obj.maxQty === 0 ? undefined : obj.maxQty, // BE sends 0 when there is no max
      requiredItems: obj.requiredItems,
      suggestedItems: obj.suggestedItems,
      description: obj.itemLongDescription ?? obj.longDescription,
      blurb: obj.itemShortDescription ?? obj.shortDescription,
    };
  };

  return merge({}, defaultsObject, reshape(itemData), overridesObject);
};

export default getItem;
