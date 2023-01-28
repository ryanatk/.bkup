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
  title: MessageKey;
}

const HERO_VARIANTS: HeroVariant[] = [
  {
    flag: 'santa-complete',
    className: 'santa',
    title: 'home_hero_santa_complete_title',
  },
  {
    flag: 'enable-december-hero',
    className: 'december',
    title: 'home_hero_december_title',
  },
];

export default HERO_VARIANTS;
