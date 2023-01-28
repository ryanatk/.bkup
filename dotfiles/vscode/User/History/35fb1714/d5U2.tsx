import { MessageKey } from '../../../../public/locales/setup';
import ActivityIcon from '../../../../svg/activity-icon.svg';
import ReadinessIcon from '../../../../svg/readiness-icon.svg';
import SleepIcon from '../../../../svg/sleep-icon.svg';
import { ButtonColor, ButtonVariant } from '../../../sormus/Button';
import { StatProps } from '../../../sormus/Stats';

export type DirectionUnion = 'left-to-right' | 'right-to-left';

export interface AppFeatureSubsectionData {
  backgroundColor: string;
  textColor: string;
  direction: DirectionUnion;
  icon: JSX.Element;
  label: {
    text: MessageKey;
    color: string;
  };
  image: {
    mobileSrc: string;
    desktopSrc: string;
    alt: MessageKey;
  };
  screen: {
    src: MessageKey;
    alt: MessageKey;
  };
  title: MessageKey;
  body: MessageKey;
  cta: {
    url: string;
    label: MessageKey;
    variant: ButtonVariant;
    color: ButtonColor;
  };
  stats?: StatProps[];
}

const appFeatureSubsectionData: AppFeatureSubsectionData[] = [
  {
    backgroundColor: 'helsinkiBlue-dark',
    textColor: 'white',
    direction: 'left-to-right',
    icon: <SleepIcon />,
    label: {
      text: 'simple_home_app_sleep_label',
      color: 'ensoBlue',
    },
    image: {
      mobileSrc: 'simple-home/m-home-three-scores-sleep@2x',
      desktopSrc: 'simple-home/d-home-three-scores-sleep@2x',
      alt: 'simple_home_app_sleep_image_alt',
    },
    screen: {
      src: 'simple_home_app_sleep_screen_src',
      alt: 'simple_home_app_sleep_screen_alt',
    },
    title: 'simple_home_app_sleep_title',
    body: 'simple_home_app_sleep_body',
    cta: {
      url: '/oura-experience#sleep',
      label: 'simple_home_app_sleep_cta',
      variant: 'ghost',
      color: 'ensoBlue',
    },
    stats: [
      {
        value: 86,
        unit: '%',
        label: 'simple_home_app_sleep_stat_1',
        footnoteCharacter: '1',
      },
      {
        value: 98,
        unit: '%',
        label: 'simple_home_app_sleep_stat_2',
        footnoteCharacter: '2',
      },
    ],
  },
  {
    backgroundColor: 'dawnBlue-medium',
    textColor: 'helsinkiBlue-dark',
    direction: 'right-to-left',
    icon: <ActivityIcon />,
    label: {
      text: 'simple_home_app_activity_label',
      color: 'helsinkiBlue-dark',
    },
    image: {
      mobileSrc: 'simple-home/m-home-three-scores-activity@2x',
      desktopSrc: 'simple-home/d-home-three-scores-activity@2x',
      alt: 'simple_home_app_activity_image_alt',
    },
    screen: {
      src: 'simple_home_app_activity_screen_src',
      alt: 'simple_home_app_activity_screen_alt',
    },
    title: 'simple_home_app_activity_title',
    body: 'simple_home_app_activity_body',
    cta: {
      url: '/oura-experience#activity',
      label: 'simple_home_app_activity_cta',
      variant: 'tertiary',
      color: 'helsinkiBlue-dark',
    },
  },
  {
    backgroundColor: 'sand',
    textColor: 'helsinkiBlue-dark',
    direction: 'left-to-right',
    icon: <ReadinessIcon />,
    label: {
      text: 'simple_home_app_readiness_label',
      color: 'helsinkiBlue-dark',
    },
    image: {
      mobileSrc: 'simple-home/m-home-three-scores-readiness@2x',
      desktopSrc: 'simple-home/d-home-three-scores-readiness@2x',
      alt: 'simple_home_app_readiness_image_alt',
    },
    screen: {
      src: 'simple_home_app_readiness_screen_src',
      alt: 'simple_home_app_readiness_screen_alt',
    },
    title: 'simple_home_app_readiness_title',
    body: 'simple_home_app_readiness_body',
    cta: {
      url: '/oura-experience#readiness',
      label: 'simple_home_app_readiness_cta',
      variant: 'tertiary',
      color: 'helsinkiBlue-dark',
    },
    stats: [
      {
        value: 88,
        unit: '%',
        label: 'simple_home_app_readiness_stat_1',
        footnoteCharacter: '1',
      },
    ],
  },
];

export default appFeatureSubsectionData;
