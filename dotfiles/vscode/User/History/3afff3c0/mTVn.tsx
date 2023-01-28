import React from 'react';
import { useLocale } from '../../public/locales/LocaleContext';
// import de from './de'

const Page = () => {
  const { selectedLocale } = useLocale();
  console.log({ selectedLocale });

  return <div></div>;
};

export default Page;
