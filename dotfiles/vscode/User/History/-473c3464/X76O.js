import createImage from '../../helpers/createImage';
import { fullPathFromImgix } from '../../components/assetUrls';
const BUY_PRODUCT_HREF = '/product/heritage-silver';

const globalSettings = {
  seo: {
    title: 'Accurate Health Information Accessible to Everyone',
    titleTemplate: '%s ',
    description:
      'asdf Oura Ring: the most accurate sleep and activity tracker is all about you: it measures the physiological signals of your body, understands your lifestyle, and guides you to make your own optimal daily choices. The ring features scientifically validated sleep tracking and personalized guidance.',
    openGraph: {
      url: 'https://ouraring.com',
      title: 'Oura Ring: Accurate Health Information Accessible to Everyone',
      description:
        'Oura Ring: the most accurate sleep and activity tracker is all about you: it measures the physiological signals of your body, understands your lifestyle, and guides you to make your own optimal daily choices. The ring features scientifically validated sleep tracking and personalized guidance.',
      images: [
        {
          url: 'http://ouraring.com/static/images/default_seo_image.png', //'https://d1a0efioav7lro.cloudfront.net/wp-content/uploads/2018/10/19180301/Bannerherohome.jpg',
          width: 1080,
          // height: 1080,
          alt: 'Oura Ring',
        },
      ],
      site_name: 'Oura Ring',
      locale: 'en_US',
    },
  },
  productHref: BUY_PRODUCT_HREF,
  footerPostsHandles: [
    'getting-started-with-moment',
    'introducing-moment',
    'meditation-and-sleep-score',
  ],
  footerPosts: [
    {
      image: createImage({
        originalSrc: fullPathFromImgix(
          '/static/assets/imgs/oura2/SleepYourCompleteGuide_2000x1333.jpg',
        ),
        width: 2000,
        height: 1333,
        alt: 'Oura Ring',
      }),
      title: 'Sleep: Your Complete Guide',
      category: 'Article',
      linkProps: {
        href: '/sleep-score',
        type: 'TYPE_ARTICLE',
        id: 'footer_article_sleep',
      },
    },
    {
      image: createImage({
        originalSrc: fullPathFromImgix(
          '/static/assets/imgs/oura2/WhatisHeartRateVariability_2000x1333.jpg',
        ),
        width: 2000,
        height: 1333,
        alt: 'Oura Ring',
      }),
      title: 'What is Heart Rate Variability?',
      category: 'Article',
      linkProps: {
        href: '/what-is-heart-rate-variability',
        type: 'TYPE_ARTICLE',
        id: 'footer_article_heartrate',
      },
    },
    {
      image: createImage({
        originalSrc: fullPathFromImgix(
          '/static/assets/imgs/oura2/AppleHealth2000x1339.jpg',
        ),
        width: 2000,
        height: 1339,
        alt: 'Oura Ring',
      }),
      title: 'Oura & Apple Health',
      category: 'Article',
      linkProps: {
        href: '/apple-health',
        type: 'TYPE_ARTICLE',
        id: 'footer_article_applehealth',
      },
    },
  ],
  cookieMessage: {
    text: `
    Cookies help us deliver the best experience on our site. By using our site, you agree to the use of cookies.
  `,
    link: {
      href: `/privacy-policy-online-store-and-website`,
      label: `Read more`,
    },
  },
};

export default globalSettings;
