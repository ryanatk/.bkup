import { dprSrcSet } from '../../../../utils/imageHelpers';
import { CACHE_BUSTER } from '../const';

const getFeatureImageProps = (
  path: string,
  format = 'png',
  maxWidth = 270,
): {
  src: string;
  srcSet: string;
} => dprSrcSet(path, format, maxWidth, undefined, CACHE_BUSTER);

export default getFeatureImageProps;
