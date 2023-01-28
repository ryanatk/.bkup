const DEFAULTS = { format: 'jpg' };

const SOLUTIONS_IMAGES = [
  {
    path: 'business/solutions-carousel-01@2x',
    alt: 'business_solutions_1_alt',
  },
  {
    path: 'business/solutions-carousel-02@2x',
    alt: 'business_solutions_2_alt',
  },
  {
    path: 'business/solutions-carousel-03@2x',
    alt: 'business_solutions_3_alt',
  },
].map((img) => ({ ...DEFAULTS, ...img })); // DRY helper

export default SOLUTIONS_IMAGES;
