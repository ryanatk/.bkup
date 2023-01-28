import cx from 'classnames';
import { ReactElement, ReactNode, useState } from 'react';
import { a, config, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { t } from '../../../../public/locales/LocaleContext';
import { MessageKey } from '../../../../public/locales/setup';
import { Grid, Image, QuoteCard, TypographyRhythm } from '../../../sormus';
import { QuoteCardProps } from '../../../sormus/QuoteCard';
import { ContactForm } from '../data/contact-form';
import { SectionProps } from '../data/section';
import ContactButton from './ContactButton';
import Eyebrow from './Eyebrow';
import styles from './Feature.module.scss';
import Typ from './Typ';

export interface BusinessFeatureProps extends Partial<SectionProps> {
  title?: MessageKey;
  body?: MessageKey;
  content?: ReactNode;
  contactForm?: ContactForm;
  image: {
    src: string;
    alt: string;
  };
  quote?: QuoteCardProps;
  children?: ReactNode;

  reverse?: boolean;
  fullImage?: boolean;
}

const Feature = ({
  name,
  id,
  title,
  body,
  content,
  contactForm,
  image,
  quote,

  fullImage,
  reverse,
  children,
}: BusinessFeatureProps): ReactElement => {
  const [visible, setVisible] = useState(false);

  const spring =
    useSpring({
      opacity: visible ? '1' : '0',
      transform: `translate3d(0, ${visible ? '0' : '25px'}, 0)`,
      config: { ...config.molasses },
    }) ?? {};

  return (
    <a.div
      id={id}
      style={{
        ...spring,
        // account for the header when scrolling to the section
        paddingTop: visible ? 80 : 250,
        marginTop: visible ? -80 : -250,
      }}
    >
      <Waypoint
        bottomOffset="25%"
        onEnter={() => {
          if (!visible) setVisible(true);
        }}
      />

      <Grid className="py-10">
        <Typ
          Element="div"
          className={cx(styles.content, styles.text, {
            [styles.reverse]: reverse,
          })}
        >
          {name && (
            <Eyebrow bold Element="h2">
              {t(name)}
            </Eyebrow>
          )}

          <TypographyRhythm>
            {title && (
              <Typ Element="h3" variant="h3">
                {t(title)}
              </Typ>
            )}

            {body && <Typ>{t(body)}</Typ>}

            {content}
          </TypographyRhythm>

          {contactForm && (
            <ContactButton
              contactForm={contactForm}
              className={styles.contact}
            />
          )}

          {children}
        </Typ>

        <Typ
          Element="div"
          className={cx(styles.content, styles.image, {
            [styles.reverse]: reverse,
            [styles.full]: fullImage,
          })}
        >
          <Image
            {...image}
            className={cx({ [styles.overlap]: Boolean(quote) })}
          />

          {quote && (
            <div className={styles.quote}>
              <QuoteCard color="inherit" bg="sand-light" {...quote} />
            </div>
          )}
        </Typ>
      </Grid>
    </a.div>
  );
};

export default Feature;
