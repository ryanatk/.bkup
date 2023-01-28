import { stubThirdPartyRoutes } from '../../utils/utils';

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
      { key: NEW_DESIGN_FLAG, enabled: true },
    ]);
    cy.location('pathname').should('equal', '/');
  });

  it('New Design is visible with flags on', () => {
    cy.visitWithFlags('/business', [{ key: BUSINESS_FLAG, enabled: true }]);
    cy.location('pathname').should('equal', '/business');
  });
});
