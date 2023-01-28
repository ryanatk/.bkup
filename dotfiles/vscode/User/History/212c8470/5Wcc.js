import { BasePageHelper } from '../../../support/helpers/BasePageHelper';
import { stubThirdPartyRoutes } from '../../utils/utils';

const FLAG = 'oura-experience-page';
const { experiencePageUrl: pathname } = new BasePageHelper();

describe('Oura Experience Page', () => {
  beforeEach(() => {
    stubThirdPartyRoutes();
  });

  it('Experience page is not visible with flag off', () => {
    cy.visitWithFlags(pathname, [{ key: FLAG, enabled: false }]);
    cy.location('pathname').should('equal', '/');
  });

  it('Experience page is visible with flag on', () => {
    cy.visitWithFlags(pathname, [{ key: FLAG, enabled: true }]);
    cy.location('pathname').should('equal', pathname);
  });
});
