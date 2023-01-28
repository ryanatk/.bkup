import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography, { TypographyElement } from '../Typography';
import styles from './TeaserBox.module.scss';

interface TeaserBoxProps {
  title: string | JSX.Element;
  titleElement?: TypographyElement;
  summary: string | JSX.Element;
  onHelpClick?: () => void;
  className?: string;
  [x: string]: any;
}

const TeaserBox: React.FC<TeaserBoxProps> = ({
  title,
  titleElement = 'h2',
  onHelpClick,
  summary,
  className = '',
  children,
  ...props
}: TeaserBoxProps) => {
  return (
    <div className={`${styles.TeaserBox} ${className}`} {...props}>
      <div className={styles.TeaserBox__Compartment}>
        <div className={styles.TeaserBox__Content}>
          <Typography
            Element={titleElement}
            variant="body"
            weight="normal"
            color="burntOrange"
            className={styles.TeaserBox__Title}
          >
            {title}
          </Typography>
          <Typography variant="eyebrow" weight="normal" Element="div">
            {summary}
          </Typography>
          {children}
        </div>

        {onHelpClick && (
          <div className={styles.TeaserBox__Additional}>
            <button onClick={onHelpClick} data-cy="button-modal-help">
              <HelpOutlineIcon className={styles.TeaserBox__HelpIcon} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeaserBox;
