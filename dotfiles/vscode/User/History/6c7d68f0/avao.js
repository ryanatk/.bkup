import { stubThirdPartyRoutes } from '../../utils/utils';

const FLAG = 'oura-experience-page';

describe('Oura Experience Page', () => {
  beforeEach(() => {
    stubThirdPartyRoutes();
  });

  it('Experience page is not visible with flag off', () => {
    cy.visitWithFlags('/business', [{ key: FLAG, enabled: false }]);
    cy.location('pathname').should('equal', '/');
  });

  it('Experience page is visible with flag on', () => {
    cy.visitWithFlags('/business', [{ key: FLAG, enabled: true }]);
    cy.location('pathname').should('equal', '/business');
  });
});
