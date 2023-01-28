import { BasePageHelper } from './BasePageHelper';
import { MAIN_CONTENT } from '../../../../components/sormus/MainContent';

export class A11yPageHelper extends BasePageHelper {
  constructor() {
    super();

    // Page specific elements
    this.mainContent = MAIN_CONTENT;
  }

  go(url) {
    cy.visit(url);
  }

  assertMainContent() {
    cy.getCy(this.mainContent).should('exist');
  }

  assertSingleMainLandmark() {
    cy.get('main').should('have.length', 1);
    cy.get('[role="main"]').should('not.exist');
  }

  assertSingleH1() {
    cy.get('h1').should('have.length', 1);
  }

  assertSingleH1InCarousel() {
    cy.get('[aria-hidden="false"] h1').should('have.length', 1);
  }
}
