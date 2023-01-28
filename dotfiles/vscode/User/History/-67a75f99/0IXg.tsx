const CartProductQuantity = () => {
  return;
  <Select
    name="ring-quantity"
    label="Quantity"
    hiddenLabel
    data-cy={`select-quantity-${lineItem.product?.handle}`}
    value={lineItem.quantity}
    onChange={handleQuantityChange}
    options={quantityOptions}
    className="w-12"
  />;
};

export default CartProductQuantity;
