import { ReactElement } from 'react';
import { useFeatureFlag } from '../../queries/FeaturesConfig';
import Bilbo from './bilbo';
import Simple from './simple';

const BusinessPage = (): ReactElement => {
  const isNewDesign = useFeatureFlag('b2b-page-new-design');
  console.log({ isNewDesign });

  if (isNewDesign) {
    return <Simple />;
  }

  return <Bilbo />;
};

export default BusinessPage;
