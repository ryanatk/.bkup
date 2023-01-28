import IconArrowDown from '../../../svg/design-tokens/icon_arrow_down.svg';
import Icon from '../Icon';
import Typography from '../Typography';
import styles from './ScrollTeaserNew.module.scss';

interface ScrollTeaserProps {
  isVisible: boolean;
  text: JSX.Element | string;
}

export const ScrollTeaser = ({ isVisible, text }: ScrollTeaserProps) => {
  return (
    <div
      aria-hidden={!isVisible}
      className={`${styles.ScrollTeaser} ${styles['ScrollTeaser--center']} ${
        !isVisible ? styles.ScrollTeaser_Invisible : ''
      }`}
    >
      <Typography
        align="center"
        variant="eyebrow"
        color="white"
        weight="bold"
        className="mb-2"
      >
        {text}
      </Typography>
      <Icon outlined className={styles['ScrollTeaser_Icon']}>
        <IconArrowDown />
      </Icon>
    </div>
  );
};

export default ScrollTeaser;
