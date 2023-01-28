import { src } from '../../../../utils/imageHelpers';

// DRY helper
const getSrc = (image: string) => src(image, 'jpg', 80);

const PRODUCT_QUOTES = [
  {
    text: 'Your brain has its own master 24 hour clock that expects regularity and thrives best under conditions of regularity including your sleep and wake schedule.',
    name: 'Matthew Walker',
    title: '@drmattwalker',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-walker@2x'),
  },
  {
    text: `Everytime I wear my Oura Ring, I feel like I get access to secret knowledge that's completely unique to me.`,
    name: 'Shara Raqs',
    title: '@shara.raqs',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-shara@2x'),
  },
  {
    text: `Oura's looking out for my overall health, helping me take control on and off the field when the season starts.`,
    name: 'Odell Beckham Junior',
    title: '@obj',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-obj@2x'),
  },
  {
    text: `The power really is in understanding the patterns and what makes for a better or worse score for you as an individual.`,
    name: 'Jenny McGuck',
    title: '@gonourishwithjenny',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-jenny@2x'),
  },
  {
    text: `Oura helps me understand my body so I can keep the momentum going and work on my skills to prepare for the next one.`,
    name: 'Katie Ledecky',
    title: '@katieledecky',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-ledecky@2x'),
  },
  {
    text: 'This thing has taught me more about sleep than I ever thought I needed to know.',
    name: 'August Marie Ball',
    title: '@philosophica82',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-amb@2x'),
  },
  {
    text: 'Oura has changed the wellness game for me, and it gives me oodles of data to improve my overall health.',
    name: 'Pam',
    title: '@pamelabaizas',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-pam@2x'),
  },
  {
    text: 'Rather than burning myself out at the gym, Oura validates the fact that my body needs time to recover.',
    name: 'Chris Paul',
    title: '@cp3',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-cp3@2x'),
  },
  {
    text: 'Oura has been such an eye opener for me, as a person who has had issues with insomnia.',
    name: 'Jess',
    title: '@scijess',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-jess@2x'),
  },
];

export default PRODUCT_QUOTES;
