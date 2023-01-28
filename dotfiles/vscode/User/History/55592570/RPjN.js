import { useMemo } from 'react';
import cx from 'classnames';

import { useChat, useShop } from 'app/context';
import { BORDER, TEXT } from 'common/const';
import {
  decoratePhone,
  getItemFlag,
  getItemTotals,
  getProductImage,
  getSiteProps,
} from 'common/utils';
import { Faqs, ProductPrices, TextLink } from 'common/components';
import { useEvent } from 'common/hooks';

import AddToCart from './AddToCart';

import styles from './ProductDetail.module.css';

const { PHONE } = getSiteProps();

const Section = ({ heading, children }) => (
  <section className={cx(BORDER.DIVIDER, styles.section)}>
    <h2 className={cx(TEXT.H6, styles.heading)}>{heading}</h2>
    {children}
  </section>
);

const ProductDetail = ({ item, isEarlyPricing }) => {
  console.log('<ProductDetail>', { item });

  const { isOnline, open: openChat } = useChat();
  const { eventId } = useShop();
  const event = useEvent(eventId);

  const phoneNumber =
    useMemo(() => event.data.branchInfo.phone, [event]) ?? PHONE.MAIN;

  const { image } = useMemo(() => {
    return { image: item.image ? getProductImage(item.image) : null };
  }, [item]);

  const { currentPrice, originalPrice } = useMemo(
    () =>
      getItemTotals({
        item,
        isEarlyPricing,
      }),
    [item, isEarlyPricing],
  );

  const flag = useMemo(
    () => getItemFlag({ ...item, price: currentPrice }),
    [item, currentPrice],
  );

  const required = useMemo(() => {
    const items = item.requiredItems ?? [];
    const length = items.length;

    return {
      items,
      hasSome: Boolean(length),
      isPlural: length > 1,
    };
  }, [item.requiredItems]);

  return (
    <article
      className={cx(styles.wrap, {
        [styles.columns]: Boolean(image),
      })}
    >
      <h1 className={cx(styles.name, TEXT.H5)}>{item.name}</h1>

      <div className={cx(styles.spotlight)}>
        {flag && (
          <h6
            className={cx(
              TEXT.SUBTITLE_2,
              styles.flag,
              {
                [styles.accompaniment]: Boolean(image),
                [styles.solo]: !Boolean(image),
              },
              flag.className,
            )}
          >
            {flag.content}
          </h6>
        )}
        {image && <img src={image} alt={item.name} />}
      </div>

      <div className={styles.details}>
        <ProductPrices
          className={styles.prices}
          inline
          currentPrice={currentPrice}
          originalPrice={originalPrice}
        />

        <p className={cx(TEXT.BODY_2, styles.blurb)}>{item.blurb}</p>

        <AddToCart item={item} />

        {required.hasSome && (
          <Section heading={`Required Item${required.isPlural ? 's' : ''}`}>
            <p>
              The following item
              {required.isPlural ? 's are' : ' is'} required with this product
              and/or service. We will automatically calculate and add{' '}
              {required.isPlural ? 'them' : 'it'} to your cart.
            </p>

            <ul>
              {required.items.map(({ image, name }) => (
                <li key={'required' + name} className={styles.required}>
                  <span className={styles.thumb}>
                    <img src={getProductImage(image)} alt={name} />
                  </span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {item.description && (
          <Section heading="Description">
            <p>{item.description}</p>
          </Section>
        )}

        <Section heading="Have a Question?">
          <ul className={styles.questions}>
            <Faqs component="li" />

            <li>
              <TextLink href={'tel:+1' + phoneNumber}>Call us</TextLink> at{' '}
              {decoratePhone(phoneNumber)}
            </li>

            {isOnline && (
              <li>
                <TextLink onClick={openChat}>Chat with our team</TextLink>
              </li>
            )}
          </ul>
        </Section>
      </div>
    </article>
  );
};

export default ProductDetail;
