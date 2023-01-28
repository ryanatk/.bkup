import { Typography } from '../components/sormus';

export const TESTIMONIALS_DATA = [
  {
    name: 'Chris Paul',
    discipline: 'Pro NBA Player & NBA All-Star MVP',
    quote:
      "Knowing pretty much when I should go to sleep, how many hours I should get, I think is something that's a huge advantage for me.",
    supplemental: '',
    primary_photo: 'meet-the-community/ambassador-01-macro-chris-paul@2x',
    secondary_photo: 'meet-the-community/ambassador-01-micro-chris-paul@2x',
    product: {
      href: '/product/heritage-gold/step1',
      name: 'Heritage Gold',
    },
  },
  {
    name: 'Lindsey Vonn',
    discipline: 'Three-time Olympic medalist',
    quote:
      "Oura gives me the information to be able to make those judgment calls and adjustments to my program, adjustments to my life, adjustments to my nutrition. Without that information I'm kind of playing guessing games. The more information I have, the better life I can live with the most accuracy.",
    supplemental: '',
    primary_photo: 'meet-the-community/ambassador-02-macro-lindsey-vonn@2x',
    secondary_photo: 'meet-the-community/ambassador-02-micro-lindsey-vonn@2x',
    product: {
      href: '/product/heritage-gold/step1',
      name: 'Heritage Gold',
    },
  },
  {
    name: 'Kai Lenny',
    discipline: 'World Champion Professional Surfer',
    quote:
      "With very little effort I get insights into my recovery and training that I didn't know existed.",
    supplemental: '',
    primary_photo: 'meet-the-community/ambassador-03-macro-kai-lenny@2x',
    secondary_photo: 'meet-the-community/ambassador-03-micro-kai-lenny@2x',
    product: {
      href: '/product/heritage-silver/step1',
      name: 'Heritage Silver',
    },
  },
];

export const STORIES_DATA = [
  {
    shortSrc: 'meet-the-community/d-user-story-04-shara@2x.jpg',
    width: 500,
    alt: '',
    content: () => (
      <div>
        <Typography>
          Oura has helped me look deeper into the relationship between my sleep
          and creative process.
        </Typography>
        <Typography weight="bold" className="mt-4">
          Shara
        </Typography>
        <Typography>Dance Choreographer &amp; Inventor</Typography>
      </div>
    ),
  },
  {
    shortSrc: 'meet-the-community/d-user-story-01-laura@2x.jpg',
    width: 500,
    alt: '',
    content: () => (
      <div>
        <Typography>
          For me, Oura is like having that friend that always gives you good
          advice and sometimes you roll your eyes at her but she keeps you
          honest, you know? She's always there caring for me &mdash; telling me
          to go to bed early, and take care of myself.
        </Typography>
        <Typography weight="bold" className="mt-4">
          Laura
        </Typography>
        <Typography>Runner &amp; Weight Lifter</Typography>
      </div>
    ),
  },
  {
    shortSrc: 'meet-the-community/d-user-story-03-richard@2x.jpg',
    width: 500,
    alt: '',
    content: () => (
      <div>
        <Typography>
          I'm excited to start listening and looking at my stats, like
          Readiness, Sleep, and HRV. Being receptive to, or even conveniently
          having, data like this was not something I had in my arsenal in the
          past, and I'm ready for it to make the difference.
        </Typography>
        <Typography weight="bold" className="mt-4">
          Richard
        </Typography>
        <Typography>World-record Breaking Triathlete</Typography>
      </div>
    ),
  },
  {
    shortSrc: 'meet-the-community/d-user-story-02-marco@2x.jpg',
    width: 500,
    alt: '',
    content: () => (
      <div>
        <Typography>
          Oura is quite possibly the only validated device able to provide high
          quality HR and HRV data collected during the entire night&hellip; The
          finger is the ideal place for PPG measurements, as the signal to noise
          ratio is much better than what you get for example at the
          wrist&hellip;
        </Typography>
        <Typography weight="bold" className="mt-4">
          Marco
        </Typography>
        <Typography>Runner &amp; Weight Lifter</Typography>
      </div>
    ),
  },
  {
    shortSrc: 'meet-the-community/d-user-story-05-tech-with-sofia@2x.jpg',
    width: 500,
    alt: '',
    content: () => (
      <div>
        <Typography>
          I never knew how much eating late in the day affected my sleep. If I
          have a heavy meal close to bedtime, my heart rate measurements suffer,
          indicating lower quality recovery during the night. I've started
          finishing up my meals by 7pm and the difference in both the sleep
          metrics I get and how I feel in the morning is noticeable.
        </Typography>
        <Typography weight="bold" className="mt-4">
          @techwithsofia
        </Typography>
        <Typography>Tech Program Manager</Typography>
      </div>
    ),
  },
];

export const CASE_STUDIES_DATA = [
  {
    title: 'UC San Francisco Health',
    summary:
      "A research team at the University of California, San Francisco (UCSF) has published early results from a large-scale COVID-19 study, TemPredict, revealing that the Oura Ring's temperature sensor could be an effective tool for fever monitoring and early illness detection.",
    logo: 'meet-the-community/logo-UCSF@2x',
  },
  {
    title: 'UC San Diego',
    summary:
      'University of California, San Diego is looking for patterns in heart rate, heart rate variability, temperature, respiratory rate, and sleep that may help identify the onset of pregnancy and/or help predict different pregnancy outcomes and progressions.',
    logo: 'meet-the-community/logo-UCSD@2x',
  },
  {
    title: 'West Virginia University',
    summary:
      "A team of researchers at West Virginia University published a new study into how accurate consumer tools are at measuring heart rate and heart rate variability (HRV). Oura's infrared photoplethysmogram (PPG) sensor matched performance with clinical-grade ECG and consistently outperformed other PPG tools.",
    logo: 'meet-the-community/logo-WVU@2x',
  },
];
