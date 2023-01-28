import { ReactElement } from 'react';
import {
  BusinessBenefits,
  BusinessFeatures,
  BusinessFooterBanner,
  BusinessHero,
  BusinessLearnMore,
  BusinessLogoGarden,
  BusinessSolutions,
} from '../../components/pages/business';
import BusinessHeader from '../../components/pages/business/BusinessHeader';
import { ContactModal } from '../../components/pages/business/components';
import ConnectModal from '../../components/pages/business/components/ConnectModal';
import { ModalProvider } from '../../components/pages/business/context/ModalContext';
import { CONTACT_FORM } from '../../components/pages/business/data';
import LegalFootnotes from '../../components/pages/_global/LegalFootnotes';
import { PageContainer, PageLayout } from '../../components/sormus';
import { NEW_MEMBER_AUG_2022_FOOTNOTE } from '../../consts/legal-footnotes';
import { business } from '../../data-mock/page-details/business';

const SimpleBusinessPage = (): ReactElement => {
  return (
    <PageLayout
      headerProps={{
        className: 'bg-white',
      }}
      seoParams={{ ...business.seoParams }}
      Header={BusinessHeader}
    >
      <PageContainer name="business-simple" padding="none">
        <ModalProvider>
          {/* SECTIONS */}
          <BusinessHero />
          <BusinessLogoGarden />
          <BusinessBenefits />
          <BusinessLearnMore />
          <BusinessSolutions />
          <BusinessFeatures />

          {/* FOOTER */}
          <BusinessFooterBanner />
          <LegalFootnotes footnotes={[NEW_MEMBER_AUG_2022_FOOTNOTE]} />

          {/* MODALS */}
          <ConnectModal />
          {Object.values(CONTACT_FORM).map((contactForm) => (
            <ContactModal key={contactForm.formId} contactForm={contactForm} />
          ))}
        </ModalProvider>
      </PageContainer>
    </PageLayout>
  );
};

export default SimpleBusinessPage;
