/**
 * This file lists out all our Hero Variants,
 * to be used by the useHeroVariant hook.
 *
 * Order matters.
 * It uses the first flag it finds that's "on".
 * If none are "on", we default to the first listed.
 *
 * Also feel free to remove variants when done with them,
 * at your own risk (and please remove styles from scss).
 */

import { MessageKey } from '../../../../public/locales/setup';

export interface HeroVariant {
  /* feature flag name */
  flag?: string;
  /* className to be applied for styles */
  className?: string;
  /* text color (also effects header, CTA, and scroll teaser) */
  color?: string;
  /* title text key */
  title: MessageKey;
  /* body text key */
  body: MessageKey;
  /* background image config */
  background: {
    mobile: string;
    desktop: string;
    alt: MessageKey;
  };
}

const HERO_VARIANTS: HeroVariant[] = [
  {
    flag: 'enable-accurate-hero',
    className: 'accurate',
    title: 'nov_2022_home_hero_title',
    body: 'nov_2022_home_hero_eyebrow',
    background: {
      mobile: 'simple-home/m-home-hero-november-22-img@2x',
      desktop: 'simple-home/d-home-hero-november-22-img@2x',
      alt: 'nov_2022_home_hero_img_alt',
    },
  },
  {
    flag: 'enable-lab-hero',
    className: 'lab',
    color: 'white',
    title: 'home_hero_santa_complete_title',
    body: 'home_hero_santa_complete_eyebrow',
    background: {
      mobile: 'simple-home/m-hero-img-ny@2x',
      desktop: 'simple-home/d-hero-img-ny@2x',
      alt: 'home_hero_december_img_alt',
    },
  },
  {
    flag: 'enable-wishlist-hero',
    className: 'wishlist',
    color: 'white',
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
