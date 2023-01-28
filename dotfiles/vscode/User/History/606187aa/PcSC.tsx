/**
 * This page is meant as reference only.
 * There should not be links to this page.
 * It should not be indexed by search engines.
 * FSA/HSA programs are for US only.
 * This page only appears in English (no translations).
 */

import { ReactElement } from 'react';
import Redirect from '../../components/sormus/Redirect';
import checkFeatureFlag from '../../utils/checkFeatureFlag';
import OriginalFsa from './OriginalFsa';

const BusinessPage = (): ReactElement => {
  const isEnabled = checkFeatureFlag('fsa-page');

  if (!isEnabled) {
    return <Redirect path="/" />;
  }

  return <OriginalFsa />;
};

export default BusinessPage;
