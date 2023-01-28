import { BasePageHelper } from '../../../support/helpers/BasePageHelper';
import { stubThirdPartyRoutes } from '../../utils/utils';

const { experiencePageUrl: pathname } = new BasePageHelper();

describe('Oura Experience Page', () => {
  beforeEach(() => {
    stubThirdPartyRoutes();
  });

  it('Experience page is visible', () => {
    cy.visit(pathname);
    cy.location('pathname').should('equal', pathname);
  });
});
