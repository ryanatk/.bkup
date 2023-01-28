const DEFAULT_OPTIONS = {
  isGift: false,
  isGiftDelivery: false,
};

const fillDeliveryAddress = (address = {}, options = {}) => {
  const { isGift, isGiftDelivery } = Object.assign(
    {},
    DEFAULT_OPTIONS,
    options,
  );

  if (isGift && !isGiftDelivery) {
    cy.getCy('field-fname').should('exist').clear().type(address.fname);
    cy.getCy('field-lname').should('exist').clear().type(address.lname);
    cy.getCy('field-email').should('exist').clear().type(address.email);
  }

  cy.getCy('field-address').should('exist').clear().type(address.address);

  if (address.address2) {
    cy.getCy('click-to-show-input', { field: 'field-address2' })
      .should('exist')
      .click();
    cy.getCy('field-address2').should('exist').clear().type(address.address2);
  }

  cy.getCy('field-city').clear().type(address.city);

  if (address.country) {
    cy.getCy('field-country').should('be.enabled').select(address.country);
  }

  if (address.state) {
    cy.getCy('field-state')
      .should('exist.and.be.enabled')
      .select(address.state);
  }

  cy.getCy('field-postal').clear().type(address.postal);
  cy.getCy('field-phone').clear().type(address.phone);
};

export default fillDeliveryAddress;
