import { oneOf, string } from 'prop-types';
import cx from 'classnames';

import { TEXT } from 'common/const';
import { getProductImage } from 'common/utils';
import { Card } from 'common/components';

import { cart, catalog, invoice, order } from './variants';

export const VARIANT = {
  CART: 'cart',
  CATALOG: 'catalog',
  INVOICE: 'invoice',
  ORDER: 'order',
};

const withVariant =
  (Component) =>
  ({
    variant,
    image: imagePath, // remove from props, so it doesn't render for catalog
    ...props
  }) => {
    const image = getProductImage(imagePath);

    switch (variant) {
      case VARIANT.CATALOG:
        return (
          <Card
            className={catalog.card}
            imageClass={catalog.image}
            contentClass={catalog.content}
            component="article"
            image={image}
            alt={props.name}
            elevation={0}
          >
            <Component
              {...props}
              quantity={null} // quantity controls are added in Shopping
              inlinePrices={true}
              variant={{
                product: cx(catalog.product),
                active: cx(catalog.active),
                name: cx(TEXT.SUBTITLE, catalog.name),
                quantity: cx(catalog.quantity),
                prices: cx(catalog.prices),
                price: cx(catalog.price),
                retail: cx(TEXT.BODY_2, catalog.retail),
                sale: cx(catalog.sale),
                flag: cx(catalog.flag),
                blurb: cx(TEXT.BODY_2, catalog.blurb),
              }}
            />
          </Card>
        );
      case VARIANT.CART:
        return (
          <Component
            image={image}
            {...props}
            variant={{
              product: cx(TEXT.BODY_2, cart.product),
              active: cx(cart.active),
              image: cx(cart.image),
              name: cx(cart.name),
              quantity: cx(cart.quantity),
              prices: cx(cart.prices),
              price: cx(cart.price),
              retail: cx(cart.retail),
              sale: cx(cart.sale),
              flag: cx(TEXT.OVERLINE, cart.flag),
              blurb: cx(cart.blurb),
            }}
          />
        );
      case VARIANT.INVOICE:
        return (
          <Component
            // image={image} no images on invoice
            {...props}
            variant={{
              product: cx(TEXT.BODY_2, invoice.product),
              active: cx(invoice.active),
              image: cx(invoice.image),
              name: cx(invoice.name),
              quantity: cx(invoice.quantity),
              prices: cx(invoice.prices),
              price: cx(invoice.price),
              retail: cx(invoice.retail),
              sale: cx(invoice.sale),
              flag: cx(TEXT.OVERLINE, cart.flag),
              blurb: cx(invoice.blurb),
            }}
          />
        );
      case VARIANT.ORDER:
        return (
          <Component
            image={image}
            {...props}
            variant={{
              product: cx(TEXT.BODY_2, order.product),
              active: cx(order.active),
              image: cx(order.image),
              name: cx(order.name),
              quantity: cx(order.quantity),
              prices: cx(order.prices),
              price: cx(order.price),
              retail: cx(order.retail),
              sale: cx(order.sale),
              flag: cx(TEXT.OVERLINE, cart.flag),
              blurb: cx(order.blurb),
            }}
          />
        );
      default:
        return <Component image={image} {...props} />;
    }
  };

withVariant.propTypes = {
  image: string,
  variant: oneOf(Object.values(VARIANT)),
};

export default withVariant;
