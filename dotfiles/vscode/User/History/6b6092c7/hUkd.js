import selectFinish from './select-finish';
import selectSize from './select-size';
import selectStyle from './select-style';

const selectProductAndAddToCart = ({
  style,
  finish,
  size,
  warranty,
  hasWarrantyOptions = true,
} = {}) => {
  // Select style
  if (style) {
    selectStyle(style);

    // Wait for page to refresh after style change
    cy.getCy('page-horizon-pdp', { style }).should('be.visible');
  }

  // Select finish
  if (finish) {
    selectFinish(finish);

    // Wait for page to refresh after finish change
    cy.getCy('page-horizon-pdp', { handle: `${style}-${finish}` }).should(
      'be.visible',
    );
  }

  // Select size
  if (size) {
    selectSize(size);

    // Wait for page to refresh after size change
    cy.getCy('page-horizon-pdp', { handle: `${style}-${finish}` }).should(
      'be.visible',
    );
  }

  // Add item to cart
  cy.getCy('button-add-to-cart').should('be.visible').click();

  // Select extended warranty
  if (hasWarrantyOptions) {
    cy.getCy('extended-warranty-selector-modal').should('be.visible');

    if (warranty) {
      cy.getCy('extended-warranty-modal', { value: warranty }).click();

      cy.getCy('extended-warranty-modal', {
        value: warranty,
        selected: true,
      }).should('be.visible');
    }

    cy.getCy('modal-add-extended-warranty').should('be.visible').click();
  }
};

export default selectProductAndAddToCart;
