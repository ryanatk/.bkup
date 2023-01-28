const CartProductRemoveButton = () => {
  return (
    <button onClick={handleRemoveCartItem} data-cy={`button-remove-cart-item`}>
      <BodyLink color="dawnBlue-dark">{t('cart_remove')}</BodyLink>
    </button>
  );
};
