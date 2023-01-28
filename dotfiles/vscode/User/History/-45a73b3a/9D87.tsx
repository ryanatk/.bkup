import { Footnote } from '../../../../consts/legal-footnotes';
import checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import BilboLegalFootnotes from './BilboLegalFootnotes';
import HorizonLegalFootnotes from './HorizonLegalFootnotes';

export interface LegalFootnotesProps {
  footnotes: Footnote[];
  className?: string;
}

const LegalFootnotes = (props: LegalFootnotesProps): JSX.Element => {
  if (checkFeatureFlag('enable-horizon')) {
    return <HorizonLegalFootnotes {...props} />;
  } else {
    return <BilboLegalFootnotes {...props} />;
  }
};

export default LegalFootnotes;
