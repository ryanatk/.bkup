import { useState } from 'react';
import checkFeatureFlag from '../utils/checkFeatureFlag';
import useHeroHeader from './useHeroHeader';

interface PageStateProps {
  featureFlag: string;
  initPageClasses?: string;
}

export const usePageState = ({
  featureFlag = '',
  initPageClasses = '',
}: PageStateProps) => {
  const { headerRef, headerHeight, updateHeaderHeight } = useHeroHeader();
  const [dynamicPageClasses, setDynamicPageClasses] = useState<string>('');
  const pageEnabled = checkFeatureFlag(featureFlag);

  const data = {
    dynamicPageClasses,
    headerHeight,
    headerRef,
    pageEnabled,
  };

  const actions = {
    setDynamicPageClasses,
    updateHeaderHeight,
  };

  return {
    ...data,
    ...actions,
  };
};
