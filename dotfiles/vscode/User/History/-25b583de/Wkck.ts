/**
 * This file lists out all our Hero Variants,
 * to be used by the useHeroVariant hook.
 *
 * Order matters.
 * It uses the first flag it finds that's "on".
 */
const HERO_VARIANTS = [
  {
    flag: 'santa-complete',
    styles: 'santa',
    title: 'home_hero_santa_complete_title',
  },
  {
    flag: 'enable-december-hero',
    styles: 'december',
    title: 'home_hero_december_title',
  },
];

export default HERO_VARIANTS;
