import { BasePageHelper } from './BasePageHelper';

export class A11yPageHelper extends BasePageHelper {
  constructor() {
    super();

    // Page specific elements
    this.mainContent = 'main-content';
  }

  go(url) {
    cy.visit(url);
  }

  assertMainContent() {
    cy.getCy(this.mainContent).should('exist');
  }

  assertSingleMainLandmark() {
    cy.get('main, [role="main"]').should('have.length', 1);
  }

  assertSingleH1() {
    cy.get('h1').should('have.length', 1);
  }

  assertSingleH1InCarousel() {
    cy.get('[aria-hidden="false"] h1').should('have.length', 1);
  }

  assertSkipToContent() {
    cy.getCy('skip-to-content')
      // .should('exist')
      .should('have.attr', 'href')
      .and('include', this.mainContent);
  }
}
