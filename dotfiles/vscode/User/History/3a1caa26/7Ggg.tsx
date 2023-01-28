import { Avatar } from '@material-ui/core';
import cx from 'classnames';
import { ReactElement } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import Typography from '../Typography';
import styles from './QuoteCard.module.scss';

export interface QuoteCardProps {
  text: MessageKey;
  name?: string;
  title?: string;
  avatarUrl?: string;
  color?: string;
  bg?: string;
}

const QuoteCard = ({
  text,
  name,
  title,
  avatarUrl,
  color,
  bg = 'sand',
}: QuoteCardProps): ReactElement => {
  return (
    <div className={cx(styles.wrap, `bg-${bg}`)}>
      <Typography color={color}>&ldquo;{t(text)}&rdquo;</Typography>

      <div className="flex items-center mt-8">
        {avatarUrl && (
          <Avatar
            src={avatarUrl}
            alt={`Avatar for ${name}`}
            imgProps={{ loading: 'lazy' }}
            className="mr-4"
          />
        )}

        <div>
          {name && (
            <Typography variant="body2" weight="bold" color={color}>
              {name}
            </Typography>
          )}

          {title && (
            <Typography variant="caption" color={color}>
              {title}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
