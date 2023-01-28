import { useState } from 'react';
import checkFeatureFlag from '../utils/checkFeatureFlag';
import useHeroHeader from './useHeroHeader';

interface PageStateOptions {
  featureFlag?: string;
  initClassName?: string;
}

export const usePageState = (options: PageStateOptions) => {
  const { featureFlag = '', initClassName = '' } = options;
  const { headerRef, headerHeight, updateHeaderHeight } = useHeroHeader();
  const [dynamicPageClasses, setDynamicPageClasses] =
    useState<string>(initClassName);
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
