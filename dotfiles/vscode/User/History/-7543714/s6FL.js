const DEFAULT_OPTIONS = {
  isGift: false,
};

const fillAccountInfo = (account, options = {}) => {
  const { isGift } = Object.assign({}, DEFAULT_OPTIONS, options);

  if (isGift) {
    cy.getCy('gift-options-checkbox')
      .should('exist')
      .find('input')
      .should('exist.and.be.enabled');
    cy.getCy('gift-options-checkbox').click();
  }

  cy.getCy('field-fname').should('exist').clear().type(account.fname);
  cy.getCy('field-lname').should('exist').clear().type(account.lname);

  if (account.email) {
    cy.getCy('field-email').should('exist').clear().type(account.email);
  }
};

export default fillAccountInfo;
