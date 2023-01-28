import { stubThirdPartyRoutes } from '../../utils/utils';

const BUSINESS_FLAG = 'business-page';

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

  it('Opens connect-modal when clicking connect-button', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);
    cy.getCy('connect-button').click();
    cy.getCy('connect-modal').should('exist');
  });

  it('Opens contact-modal when clicking contact-button', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);

    cy.getCy('button-business-modal-contact-us-wellness').click();
    cy.getCy('modal-business-modal-contact-us-wellness').should('exist');
  });

  it('Opens contact-modal when clicking contact-button', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);

    cy.getCy('button-business-modal-contact-us-performance').click();
    cy.getCy('modal-business-modal-contact-us-performance').should('exist');
  });

  it('Opens contact-modal when clicking contact-button', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);

    cy.getCy('button-business-modal-contact-us-research').click();
    cy.getCy('modal-business-modal-contact-us-research').should('exist');
  });

  it('Opens contact-modal when clicking contact-button', () => {
    cy.visitWithFlags('/business', [
      { key: BUSINESS_FLAG, enabled: true },
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);

    cy.getCy('button-business-modal-contact-us-healthcare').click();
    cy.getCy('modal-business-modal-contact-us-healthcare').should('exist');
  });
});
