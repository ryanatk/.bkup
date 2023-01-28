import { NextSeo, NextSeoProps } from 'next-seo';
import React, { FC, ReactElement, ReactNode } from 'react';
import Footer, { FooterProps } from '../Footer';
import CommonHeader, { HeaderProps } from '../Header';
import MainContent from '../MainContent';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  footnotes?: JSX.Element;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  seoParams?: NextSeoProps;
  Header?: FC<HeaderProps>;
}

export const PageLayout: React.FC<LayoutProps> = ({
  children,
  className = '',
  footnotes,
  headerProps,
  footerProps,
  seoParams,
  Header = CommonHeader,
}: LayoutProps): ReactElement => {
  return (
    <div className="tailwind">
      {seoParams && <NextSeo {...seoParams} />}
      <div id="page-wrapper" className={className}>
        <Header {...headerProps} />
        <MainContent>
          {children}
          {footnotes}
        </MainContent>
        <Footer {...footerProps} />
      </div>
    </div>
  );
};

export default PageLayout;
