import {
  BjccLogo,
  CajundomeLogo,
  EdlenLogo,
  EdlenWhiteLogo,
} from 'assets/images';

// set up each log (src & alt)
const BJCC = {
  src: BjccLogo,
  alt: 'BJCC Logo',
};
const CAJUNDOME = {
  src: CajundomeLogo,
  alt: 'Cajundome Logo',
};
const EDLEN = {
  src: EdlenLogo,
  alt: 'Edlen Logo',
};
const EDLEN_WHITE = {
  src: EdlenWhiteLogo,
  alt: 'Edlen Logo',
};

// set up aliases in config
const CONFIG = {
  BJCC,
  bjcc: BJCC,
  Cajun: CAJUNDOME,
  cajundome: CAJUNDOME,
  Edlen: EDLEN,
  edlen: EDLEN,
  edlenWhite: EDLEN_WHITE,
};

export default CONFIG;
