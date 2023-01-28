import { BasePageHelper } from './BasePageHelper';

export class CommunityPageHelper extends BasePageHelper {
  constructor() {
    super();

    this.url = '/meet-the-community';

    this.titlesCommunityPage = [
      'Built for everybody.',
      'Trusted by pros, worn by you.',
      'Chris Paul',
      'Lindsey Vonn',
      'Kai Lenny',
      'Stories that inspire us.',
      'Our results speak for themselves.',
      'Accolades',
      'Better health starts with better sleep',
    ];

    // two gold ring sale buttons
    this.goldHeritageProduct = 'button-Heritage Gold';
    // one silver ring sale button
    this.silverHeritageProduct = 'button-Heritage Silver';

    // two slideshows
    // the main image is the last one
    this.imgSlideshowImgClassPartial = 'Stories that inspire us';
    // second slideshow has actually datacy
    this.galleryAccoladeImageCy = 'gallery-accolade-';
    this.galleryAccoladeCy = 'image-accolade-source';

    //image slideshow buttons
    this.previousCommunitySlideshowImageButton = 'button-slideshow-prev';
    this.nextCommunitySlideShowImageButton = 'button-slideshow-next';

    //accolade slideshow buttons
    this.previousSlideshowAccoladeButton = 'button-accolades-prev';
    this.nextSlideshowAccoladeButton = 'button-accolades-next';

    // finally button to product page, no data-cy
    this.lastBuyOuraRing = 'Buy Oura Ring';

    //EU-cookies
    this.cookiesEUAccept = 'button-accept-all-cookies';
    this.cookiesEUManage = 'manage_cookies';
  }

  go() {
    cy.visit(this.url);
  }

  changeSlideshowImage(direction = 'next') {
    /* Function to change slideshow image on community page. Checks that index changes on the shown picture.
       :param direction: Change image to next or previous picture ['next', 'prev']
    */

    // Save current index of the image and navigate pictures. Last check that index has changed
    cy.get('h2')
      .contains(this.imgSlideshowImgClassPartial)
      .parent()
      .parent()
      .within(() => {
        cy.get('img')
          .last()
          .invoke('attr', 'data-next-index')
          .then((startingIndex) => {
            cy.get('h2')
              .contains(this.titlesCommunityPage[5])
              .should('be.visible');
            // Click either next or previous button
            if (direction == 'next') {
              cy.getCy(this.nextCommunitySlideShowImageButton)
                .first()
                .click({ scrollBehavior: true });
            } else if (direction == 'prev') {
              cy.getCy('button-slideshow-prev')
                .first()
                .click({ scrollBehavior: true });
            }

            // Check that index changes
            cy.get('img')
              .invoke('attr', 'data-next-index')
              .should('not.equal', startingIndex);
          });
      });
  }

  changeSlideshowAccolade(direction = 'next') {
    /* Function to change accolades slideshow text on community page. Checks that index changes on the shown picture.
       :param direction: Change image to next or previous picture ['next', 'prev']
    */

    // Save current index of the image and navigate accolades. Last check that index has changed
    cy.getCy(this.galleryAccoladeCy)
      .parent() //one step above is the other AccoladeDataCy
      .invoke('attr', 'data-cy')
      .then((startingIndex) => {
        // Click either next or previous button
        if (direction == 'next') {
          cy.getCy(this.nextSlideshowAccoladeButton).click({
            scrollBehavior: true,
          });
        } else if (direction == 'prev') {
          cy.getCy(this.previousSlideshowAccoladeButton).click({
            scrollBehavior: true,
          });
        }

        // Check that index changes
        cy.getCy(this.galleryAccoladeCy)
          .parent()
          .invoke('attr', 'data-cy')
          .should('not.equal', startingIndex);
      });
  }

  //go through the buy gold heritage ring buttons (2 atm) cannot use each it seems
  clickBuyGoldButtonsFirst() {
    cy.getCy(this.goldHeritageProduct).first().click({ scrollBehaviour: true });
    this.assertProductPage('/product/heritage-gold', 'gold', true);
  }

  clickBuyGoldButtonsSecond() {
    cy.getCy(this.goldHeritageProduct).last().click({ scrollBehaviour: true });
    this.assertProductPage('/product/heritage-gold', 'gold', true);
  }

  //go through the buy silver heritage ring buttons (1 atm)
  clickBuySilverButtons() {
    cy.getCy(this.silverHeritageProduct).click({ scrollBehaviour: true });
    this.assertProductPage('/product/heritage-silver', 'silver', true);
  }

  //check the last partition before footer buy ring button
  clickBuyOuraRingLE() {
    cy.get('button')
      .contains(this.lastBuyOuraRing)
      .click({ scrollBehaviour: true });
    this.assertProductPage();
  }

  assertPage() {
    this.assertCommunityPage();
  }

  // Test functions

  clickThroughCommunityImages() {
    const pictureIndexes = ['1', '2', '3', '4', '0'];

    // Check first index
    cy.get('h2')
      .contains(this.imgSlideshowImgClassPartial)
      .parent()
      .parent()
      .within(() => {
        cy.get('img').invoke('attr', 'data-next-index').should('equal', '0');
      });
    // Click through images
    pictureIndexes.forEach((index) => {
      this.changeSlideshowImage('next');
      cy.get('h2')
        .contains(this.imgSlideshowImgClassPartial)
        .parent()
        .parent()
        .within(() => {
          cy.get('img').should('have.attr', 'data-next-index', index);
        });
    });
  }

  clickThroughCommunityImagesBackwards() {
    const pictureIndexes = ['4', '3', '2', '1', '0'];

    // Check first index
    cy.get('h2')
      .contains(this.imgSlideshowImgClassPartial)
      .parent()
      .parent()
      .within(() => {
        cy.get('img').invoke('attr', 'data-next-index').should('equal', '0');
      });

    // Click through images
    pictureIndexes.forEach((index) => {
      this.changeSlideshowImage('prev');
      cy.get('h2')
        .contains(this.imgSlideshowImgClassPartial)
        .parent()
        .parent()
        .within(() => {
          cy.get('img')
            .invoke('attr', 'data-next-index')
            .should('equal', index);
        });
    });
  }

  clickThroughCommunityAccolades() {
    const accoladeIndexes = ['1', '2', '3', '4', '5', '0'];

    // Check first index
    cy.getCy(this.galleryAccoladeImageCy + '0')
      .invoke('attr', 'data-cy')
      .should('equal', this.galleryAccoladeImageCy + '0');

    // Click through accolades
    accoladeIndexes.forEach((index) => {
      this.changeSlideshowAccolade('next');
      cy.getCy(this.galleryAccoladeCy)
        .parent()
        .click({ scrollBehavior: true })
        .invoke('attr', 'data-cy')
        .should('equal', this.galleryAccoladeImageCy + index);
    });
  }

  clickThroughCommunityAccoladesBackwards() {
    const accoladeIndexes = ['5', '4', '3', '2', '1', '0'];

    // Check first index
    cy.getCy(this.galleryAccoladeImageCy + '0')
      .invoke('attr', 'data-cy')
      .should('equal', this.galleryAccoladeImageCy + '0');

    // Click through accolades
    accoladeIndexes.forEach((index) => {
      this.changeSlideshowAccolade('prev');
      cy.getCy(this.galleryAccoladeCy)
        .parent()
        .click({ scrollBehavior: true })
        .invoke('attr', 'data-cy')
        .should('equal', this.galleryAccoladeImageCy + index);
    });
  }

  //check desktop size
  goThroughTitles() {
    this.titlesCommunityPage.forEach((title, i) => {
      // others are shown first if there is a second version disabled
      cy.get('*').contains(title).click({ scrollBehavior: true });
    });
  }
}
