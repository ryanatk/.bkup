import { stubThirdPartyRoutes } from '../../utils/utils';

const BUSINESS_FLAG = 'business-page';

describe('Home page Free Shipping messaging', () => {
  beforeEach(() => {
    stubThirdPartyRoutes();
  });

  it('Business page is not visible with flag off', () => {
    cy.visitWithFlags('/business', [{ key: BUSINESS_FLAG, enabled: false }]);
    cy.location('pathname').should('equal', '/');
  });

  it('Business page is visible with flag on', () => {
    cy.visitWithFlags('/business', [{ key: BUSINESS_FLAG, enabled: true }]);
    cy.location('pathname').should('equal', '/business');
  });
});
