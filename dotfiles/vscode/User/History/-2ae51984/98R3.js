/* This class is used to store all common functions like page assertions. Point is to store all common variables and test
   functions under this class that page related classes then extend.
*/

export class BasePageHelper {
  constructor() {
    // Ring price object
    this.ringPrices = {
      silver: {
        EUR: '314',
        USD: '299',
      },
      black: {
        EUR: '314',
        USD: '299',
      },
      stealth: {
        EUR: '419',
        USD: '399',
      },
      gold: {
        EUR: '419',
        USD: '399',
      },
    };

    this.chargerPrice = {
      EUR: '€59 EUR',
      USD: '$59 USD',
    };

    // Page urls
    this.PreoOrderPageUrl = '/';
    this.ProductPageUrl = '/product/heritage-silver';
    this.cartPageUrl = '/cart';
    this.checkoutPageUrl = '/checkout';
    this.summaryPageUrl = '/checkout/summary';
    this.communityPageUrl = '/meet-the-community';
    this.myAccountOrderPageUrl = '/my-account/cypress_test/orders';
    this.myAccountMembershipPageUrl = '/my-account/cypress_test/membership';
    this.membershipPageUrl = '/membership';
    this.stravaPageUrl = '/strava';

    // Common elements on multiple pages
    this.homeButton = '#nav_home';
    this.communityButton = '#nav_meetthecommunity';
    this.priceElement = 'price-line-item';
    this.productTitleElement = 'product-title';
    this.productImageElement = 'product-image';
    this.productCaptionElement = 'product-caption';
    this.cartTitleElement = 'cart-title';
    this.cartImageElement = 'link-to-cart';

    this.ringTitle = 'Oura Ring Generation 3';
    this.chargerTitle = 'Charger Set';
    this.chargerSlug = 'charger-set';
    this.generalSizeText = 'Size: 9';
    this.membershipTitle = 'Oura Membership';
    this.sizingKitTitle = 'Oura Sizing Kit';

    // Main/Pre-order page elements
    this.preOrderHeader = 'nav_shopcta';
    this.preOrderMain = 'hero-button';
    this.titleMainPage = 'Oura Ring Generation 3';
    this.mainBlackFriday = 'The best holiday gift is better health.';

    // Community page elements
    this.communityMainTitle = 'Built for everybody';
    this.communityScrollTeaser = 'ScrollTeaser_ScrollTeaser'; // scroll teaser, class attr
    this.communityTypography =
      'We are all part of the same circle — from pro-athletes optimizing performance to those striving to improve their personal wellbeing.';

    // Product page elements
    this.helpButton = 'button-modal-help';
    this.membershipHelpElement = 'teaser-box-preorder';
    this.sizinKitHelpElement = 'teaser-sizing-kit';
    this.upgradesSizingKitElement = 'teaser-sizing-kit-upgrader';
    this.upgraderBoxElement = 'teaser-box-upgrader';
    this.addToCartButton = 'button-add-to-cart';

    this.burgerMenuButton = 'button-toggle-menu';

    // Sizing selector elements
    this.selectSizeRadioButton = 'pdp-size-selector-size_now';
    this.selectSizeLaterRadioButton = 'pdp-size-selector-size_later';
    this.sizeSelectorDropDownMenu = '#mui-component-select-ring_size_me';

    // Cart page elements
    this.continueShoppingButton = 'link-continue-shopping';
    this.checkoutBottomButton = 'button-checkout';

    // Checkout page elements
    this.sectionOrderDetailsElement = '#section-order-details';
    this.accountEmailText = 'Account Email';
    this.returnToCartText = 'Return to cart';
    this.orderDetailsBoxElement = '#section-order-details';
    this.sormusPriceElement = 'sormus-price';
    this.checkoutPriceElement = 'checkout-price';
    this.checkoutTitleElement = 'checkout-title';
    this.ringSizeElement = 'checkout-size';
    this.sizeConfirmationMsg = 'checkout-additional-details';

    // Summary page
    this.shippingAddressSection = '#section-order-shipping-address';

    // Footer texts and links
    this.footerOuraLogo = '#nav_footer';

    this.footerPulseBlog = 'The Pulse Blog';
    this.footerMyAccount = 'My Account';
    this.footerHelp = 'Help';
    this.footerSizing = 'Sizing';
    this.footerOuraCloud = 'Oura on the web';
    this.footerOuraBusiness = 'Oura for Business';
    this.footerAboutUs = 'About Us';
    this.footerPress = 'Press';
    this.footerCareers = 'Careers';
    this.footerContact = 'Contact';

    // Common texts
    this.communityText = 'Meet the Community';

    //Ext. warranty modal
    this.extendedWarrantyContinue = 'modal-add-extended-warranty';
  }

  // Common functions, header functions for example
  clickHome() {
    cy.get(this.homeButton).should('be.visible').click();
    cy.location('pathname').should('equal', this.PreoOrderPageUrl);
  }

  clickProductShop() {
    cy.getCy(this.preOrderHeader).click({ scrollBehavior: false });

    this.assertProductPage();
  }

  clickMeetTheCommunity() {
    cy.get(this.communityButton)
      .contains(this.communityText)
      .click({ scrollBehavior: false });

    this.assertCommunityPage();
  }

  // Page asserts

  // Main Page aka Pre-Order page
  assertPreOrderPage() {
    cy.getCookie('discount-token').then((cookie) => {
      if (cookie && cookie.value != '') {
        cy.location('pathname').should('equal', `/upgrade`);
      } else {
        cy.location('pathname').should('equal', this.PreoOrderPageUrl);
      }
    });

    // Visible elements when entering the page
    cy.get(this.homeButton).should('be.visible');
    cy.get(this.communityButton)
      .contains(this.communityText)
      .should('be.visible');
    cy.getCy(this.preOrderHeader).should('be.visible');

    cy.get('h2').should('be.visible');
    cy.getCy(this.preOrderMain).should('be.visible');
  }

  assertCommunityPage() {
    cy.location('pathname').should('equal', this.communityPageUrl);

    cy.get(this.homeButton).should('be.visible');
    cy.getCy(this.preOrderHeader).should('be.visible');

    cy.get('*[class^=' + this.communityScrollTeaser + ']').should('be.visible');
    cy.get('h2').contains(this.communityMainTitle).should('be.visible');
    cy.get('p').contains(this.communityTypography).should('be.visible');
  }

  assertProductPage(
    url = this.ProductPageUrl,
    ring = 'silver',
    emptyCart = true,
    mobileBrowser = false,
  ) {
    /* Helper function to assert product page

       :param url: Url for the selected ring model
       :param ring: Ring model [silver, black, stealth, gold]
       :param empryCart: If set to false the cart image will be checked from the header [true, false]
    */

    // Product page url changes according to selected ring and with upgrade code
    cy.getCookie('discount-token').then((cookie) => {
      if (cookie && cookie.value != '') {
        cy.location('pathname').should('equal', `${url}/upgrade`);
      } else {
        cy.location('pathname').should('equal', url);
      }
    });

    // Page elements
    if (mobileBrowser) {
      cy.getCy(this.burgerMenuButton).should('be.visible');
    } else {
      cy.get(this.communityButton)
        .contains(this.communityText)
        .should('be.visible');
    }
    cy.get('h1').contains(this.ringTitle).should('be.visible');
    cy.getCy(this.addToCartButton).should('be.visible');

    // Big product image
    cy.get('img').invoke('attr', 'src').should('include', `${ring}`);

    // Teaser boxes and help buttons. Upgrader flow has different teaser box. Check discount-token.
    cy.getCookie('discount-token').then((cookie) => {
      if (cookie && cookie.value != '') {
        cy.getCy(this.upgraderBoxElement).within(() => {
          cy.getCy(this.helpButton).should('be.visible');
        });
        cy.getCy(this.upgradesSizingKitElement).within(() => {
          cy.getCy(this.helpButton).should('be.visible');
        });
      } else {
        cy.getCy(this.membershipHelpElement).within(() => {
          cy.getCy(this.helpButton).should('be.visible');
        });

        // Check size selector if flag is on
        const state = window.localStorage.getItem('root');
        const stateParsed = state ? JSON.parse(state) : {};

        if (stateParsed.app?.flags['pdp-size-selector']) {
          // Check the sizing kit elements
          cy.getCy(this.selectSizeLaterRadioButton).should('be.visible');
          cy.getCy(this.selectSizeRadioButton).should('be.visible');
          cy.get(this.sizeSelectorDropDownMenu).should('be.visible');
        }
      }
    });

    // Check product finishes
    cy.getCy('swatch-heritage-black').should('exist');
    cy.getCy('swatch-heritage-stealth').should('exist');
    cy.getCy('swatch-heritage-gold').should('exist');
    cy.getCy('swatch-heritage-silver').should('exist');

    // If cart is empty there should not be cart icon on the top right on the header
    if (emptyCart) {
      cy.getCy(this.cartImageElement).should('not.exist');
    } else {
      cy.getCy(this.cartImageElement).should('be.visible');
    }
  }

  assertCartPage(model, size = undefined, multipleRings = false) {
    /* Helper function to check cart page when there's a ring in a cart.

       :param model: Ring model [heritage-silver, heritage-black, heritage-stealth, heritage-gold]
       :param size: Ring size
    */

    const hardwareOnly = [this.chargerSlug];

    cy.location('pathname').should('equal', this.cartPageUrl);

    // Elements and buttons
    cy.getCy(this.cartTitleElement).contains('Cart').should('be.visible');
    cy.getCy(this.priceElement).should('be.visible');
    cy.getCy(this.continueShoppingButton).should('be.visible');
    cy.getCy(this.checkoutBottomButton).should('be.visible');
    cy.getCy(this.cartImageElement).should('be.visible');

    // Product images and texts
    cy.getCy(this.productTitleElement)
      .contains(
        hardwareOnly.includes(model) ? this.chargerTitle : this.ringTitle,
      )
      .should('be.visible');
    cy.getCy('button-remove-cart-item').should('exist');

    if (!multipleRings) {
      cy.getCy(this.productImageElement)
        .invoke('attr', 'alt')
        .should('equal', model);
    }

    if (!hardwareOnly.includes(model)) {
      cy.get('[alt=subscription]').should('be.visible');
    }

    // If size is selected check that sizing kit is not included in the cart
    if (size != undefined) {
      cy.getCy('product-caption').contains(size);
      cy.get('[alt=sizing-kit]').should('not.exist');
    } else {
      cy.get('[alt=sizing-kit]').should('be.visible');
    }
  }

  assertCheckoutPage(ringSize = undefined) {
    // Check user detail elements
    cy.getCy('page-checkout').should('exist');

    cy.contains(this.accountEmailText).should('be.visible');
    cy.get(this.sectionOrderDetailsElement).should('be.visible');
    cy.contains(this.returnToCartText).should('be.visible');

    this.assertOrderDetails(ringSize);
  }

  assertSummaryPage(
    email,
    firstName,
    lastName,
    address,
    city,
    postalCode,
    phoneNumber,
    ringSize = undefined,
    isAccessory = false,
  ) {
    /* Helper function to check summary page after successful order

       :param email: Orderer's email
       :param firstName: Orderer's first name
       :param lastName: Orderer's last name
       :param address: Orderer's address
       :param city: Orderer's city
       :param postalCode: Orderer's postal code
       :param phoneNumber: Orderer's phone number
    */
    // Reduce flaky tests by increasing the timeout
    cy.location('pathname', { timeout: 60000 }).should(
      'equal',
      this.summaryPageUrl,
    );
    cy.getCy('summary-thank-you').contains(`Thank you`);

    cy.get(this.shippingAddressSection).within(() => {
      cy.contains(firstName);
      cy.contains(lastName);
      cy.get('p').contains(phoneNumber);
      cy.get('p').contains(address);
      cy.get('p').contains(city);
      cy.get('p').contains(postalCode);
    });

    this.assertOrderDetails(ringSize, isAccessory);
    this.assertFooter();
  }

  assertFooter() {
    // Check elements on the page footer. The page footer should be on all pages

    // Oura logo and email field
    cy.get(this.footerOuraLogo).should('exist');
    cy.get('[type="email"]').should('exist');
    cy.get('button[type="submit"]').should('exist');

    // Sub page links under ul all texts are class my-6
    cy.get('ul')
      .children('.my-6')
      .within(() => {
        cy.contains(this.footerMyAccount).should('exist');
        cy.contains(this.footerHelp).should('exist');
        cy.contains(this.footerSizing).should('exist');
        cy.contains(this.footerOuraCloud).should('exist');
        cy.contains(this.footerAboutUs).should('exist');
        cy.contains(this.footerPress).should('exist');
        cy.contains(this.footerCareers).should('exist');
        cy.contains(this.footerContact).should('exist');
      });

    // Check social media links
    cy.get('div.col-main > nav > div:nth-child(1) > a')
      .should('have.attr', 'href')
      .and('equal', 'https://instagram.com/ouraring');
    cy.get('div.col-main > nav > div:nth-child(2) > a')
      .should('have.attr', 'href')
      .and('equal', 'https://twitter.com/ouraring');
    cy.get('div.col-main > nav > div:nth-child(3) > a')
      .should('have.attr', 'href')
      .and('equal', 'https://www.facebook.com/ouraring/');
    cy.get('div.col-main > nav > div:nth-child(4) > a')
      .should('have.attr', 'href')
      .and('equal', 'https://www.youtube.com/c/Ouraring_%C5%8CURA');
  }

  assertOrderDetails(ringSize = undefined, isAccessory) {
    // Check order details elements eg. ring, membership and sizing kit
    cy.get(this.orderDetailsBoxElement).within(() => {
      // Check price elements
      if (isAccessory && ringSize) {
        cy.getCy(this.ringSizeElement).should('contain', ringSize);
        cy.getCy(this.checkoutPriceElement).should('have.length', 1);
      } else if (ringSize != undefined) {
        // When ring size is determined. Check the size and that there is only ring and membership in the cart
        cy.getCy(this.ringSizeElement).should('contain', ringSize);
        cy.getCy(this.checkoutPriceElement).should('have.length', 2);
      } else {
        // When ring size is not selected there should be sizing kit in the cart on the checkout
        cy.getCy(this.checkoutPriceElement).should('have.length', 3);
      }

      if (!isAccessory) {
        // images
        cy.get('img')
          .eq(0)
          .should('have.attr', 'alt')
          .and('contains', this.ringTitle);
        // titles
        cy.getCy(this.checkoutTitleElement).eq(0).contains(this.ringTitle);
      }

      // Removed from cart
      // cy.getCy(this.checkoutTitleElement).eq(2).contains(this.sizingKitTitle);
    });
  }

  assertSleepCoachingCheckout(currency = '') {
    let price = {};

    // Set currency
    switch (currency) {
      case 'USD':
        price = {
          symbol: '$',
          amount: '199',
          currency: 'USD',
        };
        break;
      case 'EUR':
        price = {
          symbol: '€',
          amount: '199',
          currency: 'EUR',
        };
    }

    // Assert page elements
    cy.get(this.homeButton).should('be.visible');
    cy.get(this.communityButton).should('be.visible');
    cy.getCy(this.preOrderHeader).should('be.visible');
    cy.getCy(this.emailPartition).should('be.visible');

    // Assert sormus price
    cy.getCy(this.sormusPriceElement).should('contain', price.symbol);
    cy.getCy(this.sormusPriceElement).should('contain', price.amount);
    cy.getCy(this.sormusPriceElement).should('contain', price.currency);
  }

  // General utility functions
  getRandomFirstName() {
    const names = [
      'Michael',
      'Kyle',
      'Pam',
      'Jimmy',
      'Saul',
      'Hank',
      'Walter',
      'Jesse',
      'Tony',
      'Perttu',
      'Sami',
      'Stanley',
      'James',
      'Andy',
      'Dwight',
      'Darryl',
      'Kevin',
      'Bruce',
      'George',
      'Harry',
      'Trevor',
      'Randy',
      'Ricky',
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  getRandomLastName() {
    const names = [
      'Scott',
      'Bernard',
      'Johnson',
      'Smith',
      'Wilson',
      'Beasley',
      'Halpert',
      'Schrute',
      'Schrödinger',
      'Green',
      'Wayne',
      'Turner',
      'Hill',
      'White',
      'Pinkman',
      'Soprano',
      'Bernard',
      'Falco',
      'Gaultieri',
      'Malone',
      'Hudson',
      'Lahey',
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  getRandomCity() {
    const cities = [
      'Hamburg',
      'Oulu',
      'Helsinki',
      'Singapore',
      'San Fransisco',
      'Oran',
      'Montreal',
      'Phialdelphia',
      'Rome',
      'Milan',
      'Chicago',
      'Munich',
      'London',
      'Test City',
      'Lagos',
      'Tripoli',
    ];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  getRandomState() {
    const states = [
      'Florida',
      'North Carolina',
      'New York',
      'California',
      'Colorado',
      'Oregon',
    ];

    return states[Math.floor(Math.random() * states.length)];
  }

  getRandomNumberString(length) {
    const numbers = `${Math.floor(Date.now())}`;
    return numbers.slice(length * -1);
  }

  getRandomAddress() {
    const letters = 'qwertyuiopåasdfghjklöäzxcvbnm';
    const suffix = ['Rd', 'St', 'Dr', 'Way', 'Ave'];
    var address = '';

    // Combine street name
    for (var i = 0; i < 10; i++) {
      address += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return `${address} ${suffix[Math.floor(Math.random() * suffix.length)]}`;
  }

  getRandomAddress2() {
    const suiteLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const suiteNumber = this.getRandomNumberString(2);

    return `${
      suiteLetter[Math.floor(Math.random() * suiteLetter.length)]
    } ${suiteNumber}`;
  }
}
