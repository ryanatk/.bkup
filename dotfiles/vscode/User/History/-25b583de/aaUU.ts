/**
 * This file lists out all our Hero Variants,
 * to be used by the useHeroVariant hook.
 *
 * Order matters.
 * It uses the first flag it finds that's "on".
 * If none are "on", the first listed is used.
 */

import { MessageKey } from '../../../../public/locales/setup';

interface Image {
  src: string;
  alt: MessageKey;
}

export interface HeroVariant {
  flag: string;
  className: string;
  title: MessageKey;
  body: MessageKey;
  background: {
    mobile: Image;
    desktop: Image;
  };
}

const HERO_VARIANTS: HeroVariant[] = [
  {
    flag: 'santa-complete',
    className: 'santa',
    title: 'home_hero_santa_complete_title',
    body: 'home_hero_santa_complete_eyebrow',
    background: {
      mobile: {
        src: 'simple-home/m-hero-img-ny@2x',
        alt: 'home_hero_december_img_alt',
      },
      desktop: {
        src: 'simple-home/d-hero-img-ny@2x',
        alt: 'home_hero_december_img_alt',
      },
    },
  },
  {
    flag: 'enable-december-hero',
    className: 'december',
    title: 'home_hero_december_title',
    body: 'home_hero_december_eyebrow',
    background: {
      mobile: {
        src: 'simple-home/m-home-hero-img-december@2x',
        alt: 'home_hero_december_img_alt',
      },
      desktop: {
        src: 'simple-home/d-home-hero-img-december@2x',
        alt: 'home_hero_december_img_alt',
      },
    },
  },
];

export default HERO_VARIANTS;
