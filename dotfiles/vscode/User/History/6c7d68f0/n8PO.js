import { stubThirdPartyRoutes } from '../../utils/utils';
// import { CONTACT_FORM } from '../../../../../components/pages/business/data';

const BUSINESS_FLAG = 'business-page';
const NEW_DESIGN_FLAG = 'b2b-page-new-design';

describe('Business page', () => {
  beforeEach(() => {
    stubThirdPartyRoutes();
  });

  it('is not visible with flag off', () => {
    cy.visitWithFlags('/business', [{ key: BUSINESS_FLAG, enabled: false }]);
    cy.location('pathname').should('equal', '/');
  });

  it('is visible with flag on', () => {
    cy.visitWithFlags('/business', [{ key: BUSINESS_FLAG, enabled: true }]);
    cy.location('pathname').should('equal', '/business');
  });

  it('New Design is not visible withs flag off', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: false },
    ]);
    cy.getCy('page-business-simple').should('not.exist');
  });

  it('New Design is visible with flags on', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);
    cy.getCy('page-business-simple').should('exist');
  });

  it('Opens connect-modal when clicking connect-button', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);
    cy.getCy('connect-button').click();
    cy.getCy('connect-modal').should('exist');
  });

  it.only('Opens contact-modal when clicking contact-button', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);

    cy.getCy(`button-business-modal-contact-us-wellness`).click();
    cy.getCy(`modal-business-modal-contact-us-wellness`).should('exist');
    cy.getCy('modal-close').click({ multiple: true });

    // cy.getCy(`button-${CONTACT_FORM.WELLNESS.modalId}`).click();
    // cy.getCy(`modal-${CONTACT_FORM.WELLNESS.modalId}`).should('exist');
    // cy.getCy('modal-close').click();

    // Object.values(CONTACT_FORM).map(({ modalId }) => {
    //   cy.getCy(`button-${modalId}`).click();
    //   cy.getCy(`modal-${modalId}`).should('exist');
    //   cy.getCy('modal-close').click();
    // });
  });
});
