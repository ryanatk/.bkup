import { Avatar } from '@material-ui/core';
import { ReactElement } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import Typography from '../Typography';

export interface QuoteCardProps {
  text: MessageKey;
  name?: string;
  title?: string;
  avatarUrl?: string;
}

const QuoteCard = ({
  text,
  name,
  title,
  avatarUrl,
}: QuoteCardProps): ReactElement => {
  return (
    <div className="wrap">
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

export default QuoteCard;
