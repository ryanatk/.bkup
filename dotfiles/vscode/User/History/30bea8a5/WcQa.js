import { any, bool, string } from 'prop-types';
import cx from 'classnames';
import { Card as MuiCard, CardContent, CardMedia } from '@mui/material';

import { log } from 'common/utils';

import styles from './Card.module.css';

const Card = ({
  alt,
  contentClass,
  image,
  imageClass,
  padded,
  children,
  ...rest
}) => {
  // console.log('<Card>', { alt, contentClass, image, imageClass, children });

  if (image && !alt) {
    log(, {error: 'Please provide an `alt` attribute for the Card image', data:image});
  }

  return (
    <MuiCard {...rest}>
      {image && (
        <CardMedia
          component="img"
          classes={{ root: imageClass }}
          image={image}
          alt={alt}
          sx={{ objectFit: 'contain' }}
        />
      )}
      <CardContent
        classes={{
          root: cx(contentClass, {
            [styles.padded]: padded,
          }),
        }}
      >
        {children}
      </CardContent>
    </MuiCard>
  );
};

Card.propTypes = {
  alt: string,
  contentClass: string,
  imageClass: string,
  image: string,
  padded: bool,
  children: any,
};

Card.defaultProps = {};

export default Card;
