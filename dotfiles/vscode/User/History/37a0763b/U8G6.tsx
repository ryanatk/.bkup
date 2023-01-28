import { NextSeo, NextSeoProps } from 'next-seo';
import React, { ReactNode } from 'react';
import EyebrowCTA, { EyebrowCTAProps } from '../EyebrowCTA';
import Footer, { FooterProps } from '../Footer';
import Header, { HeaderProps } from '../Header';
import MainContent from '../MainContent';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  eyebrowProps?: EyebrowCTAProps;
  footnotes?: JSX.Element;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  seoParams?: NextSeoProps;
}

export const PageLayout: React.FC<LayoutProps> = ({
  children,
  className = '',
  eyebrowProps,
  footnotes,
  headerProps,
  footerProps,
  seoParams,
}) => {
  return (
    <div className="tailwind">
      {seoParams && <NextSeo {...seoParams} />}
      <div id="page-wrapper" className={className}>
        <EyebrowCTA {...eyebrowProps} />
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
