import { Avatar } from '@material-ui/core';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { breakpoints } from '../constants';
import Typography from '../Typography';
import styles from './QuoteSlider.module.scss';

export interface QuoteCardProps {
  text: MessageKey;
  name?: string;
  title?: string;
  avatarUrl?: string;
}

const QuoteCard = ({ text, name, title, avatarUrl }: QuoteCardProps) => {
  const isMinWidthXL = useMediaQuery(`(min-width:${breakpoints.xlarge}px)`);
  const isMinWidthLarge = useMediaQuery(`(min-width:${breakpoints.large}px)`);
  const isMinWidthMed = useMediaQuery(`(min-width:${breakpoints.medium}px)`);

  const getStyle = () => {
    if (isMinWidthXL) return styles['QuoteCard--xl'];
    if (isMinWidthLarge) return styles.QuoteCard;
    if (isMinWidthMed) return styles['QuoteCard--tablet'];
    return styles['QuoteCard--mobile'];
  };

  return (
    <div className={getStyle()}>
      <Typography>&ldquo;{t(text)}&rdquo;</Typography>

      <div className="flex items-center mt-8">
        {avatarUrl && (
          <Avatar
            src={avatarUrl}
            alt={`Avatar for ${name}`}
            imgProps={{ loading: 'lazy' }}
          />
        )}

        <div className="ml-4">
          {name && (
            <Typography variant="body2" weight="bold">
              {name}
            </Typography>
          )}

          {title && <Typography variant="caption">{title}</Typography>}
        </div>
      </div>
    </div>
  );
};
