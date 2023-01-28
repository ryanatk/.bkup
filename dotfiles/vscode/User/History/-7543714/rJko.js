const DEFAULT_OPTIONS = {
  isGift: false,
};

const fillAccountInfo = (account, options = {}) => {
  const { isGift } = Object.assign({}, DEFAULT_OPTIONS, options);

  if (isGift) {
    cy.getCy('gift-options-checkbox').should('exist');
    cy.getCy('gift-options-checkbox').find('input').should('be.enabled');
    cy.getCy('gift-options-checkbox').click();
  }

  cy.getCy('field-fname').should('exist');
  cy.getCy('field-fname').clear().type(account.fname);

  cy.getCy('field-lname').should('exist');
  cy.getCy('field-lname').clear().type(account.lname);

  if (account.email) {
    cy.getCy('field-email').should('exist');
    cy.getCy('field-email').clear().type(account.email);
  }
};

export default fillAccountInfo;
