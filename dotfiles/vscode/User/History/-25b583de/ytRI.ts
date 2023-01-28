/**
 * This file lists out all our Hero Variants,
 * to be used by the useHeroVariant hook.
 *
 * Order matters.
 * It uses the first flag it finds that's "on".
 * If none are "on", the first listed is used.
 */

import { MessageKey } from '../../../../public/locales/setup';

export interface HeroVariant {
  flag: string;
  className: string;
  color?: string;
  title: MessageKey;
  body: MessageKey;
  background: {
    mobile: string;
    desktop: string;
    alt: MessageKey;
  };
}

const HERO_VARIANTS: HeroVariant[] = [
  {
    flag: 'enable-november-hero-image',
    className: 'november',
    color: 'black',
    title: 'nov_2022_home_hero_title',
    body: 'nov_2022_home_hero_eyebrow',
    background: {
      mobile: 'simple-home/m-home-hero-november-22-img@2x',
      desktop: 'simple-home/d-home-hero-november-22-img@2x',
      alt: 'nov_2022_home_hero_img_alt',
    },
  },
  {
    flag: 'santa-complete',
    className: 'santa',
    title: 'home_hero_santa_complete_title',
    body: 'home_hero_santa_complete_eyebrow',
    background: {
      mobile: 'simple-home/m-hero-img-ny@2x',
      desktop: 'simple-home/d-hero-img-ny@2x',
      alt: 'home_hero_december_img_alt',
    },
  },
  {
    flag: 'enable-december-hero',
    className: 'december',
    title: 'home_hero_december_title',
    body: 'home_hero_december_eyebrow',
    background: {
      mobile: 'simple-home/m-home-hero-img-december@2x',
      desktop: 'simple-home/d-home-hero-img-december@2x',
      alt: 'home_hero_december_img_alt',
    },
  },
];

export default HERO_VARIANTS;
