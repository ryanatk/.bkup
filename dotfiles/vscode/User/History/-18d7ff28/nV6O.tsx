import { useState } from 'react';
import checkFeatureFlag from '../utils/checkFeatureFlag';
import useHeroHeader from './useHeroHeader';

interface PageStateProps {
  featureFlag?: string;
  initClassName?: string;
}

export const usePageState = ({
  featureFlag = '',
  initClassName = '',
}: PageStateProps) => {
  const { headerRef, headerHeight, updateHeaderHeight } = useHeroHeader();
  const [dynamicPageClasses, setDynamicPageClasses] =
    useState<string>(initClassName);
  const pageEnabled = featureFlag ? checkFeatureFlag(featureFlag) : true;

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
