import { basicAuth } from '../../integration/utils/utils';
import { BasePageHelper } from './BasePageHelper';

export class ProductPageHelper extends BasePageHelper {
  constructor() {
    super();

    this.url = '/product/heritage-silver';
    this.chargerUrl = '/product/charger-set';

    // Page specific elements
    this.homeButton = '#nav_home';
    this.communityButton = '#nav_meetthecommunity';
    this.communityText = 'Meet the Community';
    this.sizingHelpTitle = 'Oura Ring Sizing';

    // Buttons
    this.nextSlideShowImageButton = 'button-slideshow-next';
    this.prevSlideShowImageButton = 'button-slideshow-prev';
    this.freeSizingKitHelpButton = 'sizing-kit-more-info';
    this.helpDialogCloseButton = 'modal-close';

    // Charger pdp
    this.pdpSizeSelector = 'pdp-size-selector-select-size';
    this.chargerSizeDD = 'option-9';
  }

  go() {
    cy.visit(this.url, basicAuth);
  }

  // Helper functions
  // Functions that can be executed at any time and are not dependent on the current state of the page

  selectRing(
    ring,
    model,
    modelUrl,
    productPageIcon,
    currency = undefined,
    discount = 0,
  ) {
    /* This function selects ring from product page and asserts the elements
       :param ring: Ring model [silver, black, stealth, gold]
       :param model: Ring model [heritage-silver, heritage-black, heritage-stealth, heritage-gold]
       :param modelUrl: Url of the selected model
       :param productPageIcon: icon on the product page to select the ring
       :param currency: Currency, leave '' if no need for price check [EUR, USD]
       :param discount: Amount for discount
    */

    // Select correct ring and check price
    cy.getCy(productPageIcon).click({ scrollBehavior: false });
    this.assertPage(modelUrl, ring);

    if (currency != undefined) {
      if (discount) {
        cy.getCy('product-detail-discount-price').should(
          'include.text',
          this.ringPrices[ring][currency] - discount,
        );
      } else {
        cy.getCy('product-detail-price').should(
          'include.text',
          this.ringPrices[ring][currency],
        );
      }
    }
  }

  selectSize(size, sizeLaterAvailable = true) {
    if (sizeLaterAvailable) {
      cy.getCy(this.selectSizeRadioButton).click();
    }
    cy.get(this.sizeSelectorDropDownMenu).click();

    cy.getCy(`option-${size}`).click();
  }

  selectFreeSizingKit() {
    cy.getCy(this.selectSizeLaterRadioButton).click();
  }

  verifyNoSizingKitOption() {
    cy.getCy(this.selectSizeLaterRadioButton).should('not.exist');
  }

  changeProductImage(direction = 'next') {
    /* Function to change product image on product page. Checks that index changes on the shown picture.
       :param direction: Change image to next or previous picture ['next', 'prev']
    */

    // Save current index of the image and navigate pictures. Last check that index has changed
    cy.get('img')
      .invoke('attr', 'data-next-index')
      .then((startingIndex) => {
        // Click either next or previous button
        if (direction == 'next') {
          cy.getCy(this.nextSlideShowImageButton)
            .first()
            .click({ scrollBehavior: false });
        } else if (direction == 'prev') {
          cy.getCy(this.prevSlideShowImageButton)
            .first()
            .click({ scrollBehavior: false });
        }

        // Check that index changes
        cy.get('img')
          .invoke('attr', 'data-next-index')
          .should('not.equal', startingIndex);
      });
  }

  addChargerToCart(size = 6) {
    const model = 'charger-set';
    this.selectSize(size, false);
    this.clickAddToCart(model, size);
  }

  addRingToCart(
    ring,
    model,
    modelUrl,
    productPageIcon,
    currency = undefined,
    discount = 0,
    size = undefined,
    multipleRings = false,
  ) {
    /* Add selected ring to cart. This function asserts the page and adds ring to the cart
       :param ring: Ring model [silver, black, stealth, gold]
       :param model: Ring model [heritage-silver, heritage-black, heritage-stealth, heritage-gold]
       :param modelUrl: Url of the selected model
       :param productPageIcon: icon on the product page to select the ring
       :param currency: Currency, leave '' if no need for price check [EUR, USD]
       :param discount: Amount for discount
       :param size: Ring size
    */
    this.selectRing(ring, model, modelUrl, productPageIcon, currency, discount);

    cy.log(`XXXXXXXXX  The size is:${size}`);

    if (size != undefined) {
      this.selectSize(size);
    }

    this.clickAddToCart(model, size, multipleRings);
  }

  clickAddToCart(
    model = 'heritage-silver',
    size = undefined,
    multipleRings = false,
  ) {
    /*
    :param model: Ring model [heritage-silver, heritage-black, heritage-stealth, heritage-gold]
    */

    cy.getCy(this.addToCartButton).click({ scrollBehavior: 'bottom' });
    this.assertCartPage(model, size, multipleRings);
  }

  openMembershipHelp(scrollBehavior = false) {
    cy.getCy(this.membershipHelpElement).within(() => {
      cy.getCy(this.helpButton).click({ scrollBehavior: scrollBehavior });
    });
    cy.contains('The Oura Membership').should('be.visible');
  }

  openSizingKitHelp(scrollBehavior = false) {
    cy.getCy(this.sizinKitHelpElement).within(() => {
      cy.getCy(this.helpButton).click({ scrollBehavior: scrollBehavior });
    });
    cy.contains('Oura Ring Sizing').should('be.visible');
  }

  openSizingSelectHelp(scrollBehavior = false) {
    cy.getCy(this.freeSizingKitHelpButton).click();
    cy.get('h2').contains(this.sizingHelpTitle).should('be.visible');
  }

  closeHelpDialog(scrollBehavior = false) {
    cy.getCy(this.helpDialogCloseButton)
      .filter(':visible')
      .click({ scrollBehavior: scrollBehavior });
  }

  assertPage(modelUrl = this.url, ring = 'silver', assertEmptyCart = true) {
    this.assertProductPage(modelUrl, ring, assertEmptyCart);
  }

  // Test functions
  // Functions that execute test steps. Needs page to be on certain state to work.

  clickThroughProductImages(ring) {
    const pictureIndexes = ['1', '2', '3', '4', '0'];

    // Check first index
    cy.get('img').invoke('attr', 'data-next-index').should('equal', '0');
    cy.get('img').invoke('attr', 'src').should('include', ring);

    // Click through images
    pictureIndexes.forEach((index) => {
      this.changeProductImage('next');
      cy.get('img').should('have.attr', 'data-next-index', index);
      cy.get('img').invoke('attr', 'src').should('include', ring);
    });
  }

  clickThroughProductImagesBackwards(ring) {
    const pictureIndexes = ['4', '3', '2', '1', '0'];

    // Check first index
    cy.get('img').invoke('attr', 'data-next-index').should('equal', '0');
    cy.get('img').invoke('attr', 'src').should('include', ring);

    // Click through images
    pictureIndexes.forEach((index) => {
      this.changeProductImage('prev');
      cy.get('img').invoke('attr', 'data-next-index').should('equal', index);
      cy.get('img').invoke('attr', 'src').should('include', ring);
    });
  }

  goThroughAllModels() {
    const rings = ['silver', 'black', 'stealth', 'gold'];

    rings.forEach((ring) => {
      this.selectRing(
        ring,
        `heritage-${ring}`,
        `/product/heritage-${ring}`,
        `swatch-heritage-${ring}`,
      );
      this.changeProductImage('next');
    });
  }

  verifyPrice(price, currency, isDiscount = false) {
    const selector = isDiscount
      ? 'product-detail-discount-price'
      : 'product-detail-price';

    cy.getCy(selector).contains(price);
    if (currency) {
      cy.getCy(selector).contains(currency);
    }
  }

  verifyPriceForLocale(locale) {
    if (locale === 'eu') {
      this.verifyPrice(314, '€');
    } else this.verifyPrice(299, 'USD');
  }

  testHelpButtons(scrollBehavior = false) {
    this.openMembershipHelp(scrollBehavior);
    this.closeHelpDialog(scrollBehavior);
    this.openSizingSelectHelp(scrollBehavior);
    // this.openSizingKitHelp(scrollBehavior);
    this.closeHelpDialog(scrollBehavior);
  }
}
