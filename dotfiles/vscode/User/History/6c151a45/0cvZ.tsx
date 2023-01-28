import { t } from '../../../public/locales/LocaleContext';
import { BodyLink, Typography } from '../../sormus';

const NewsMessage = () => (
  <Typography data-cy="text-news">
    {t('checkout_summary_news', {
      blog_link: (
        <BodyLink href="https://ouraring.com/blog" target="_blank">
          The Pulse Blog
        </BodyLink>
      ),
      instagram_link: (
        <BodyLink href="https://www.instagram.com/ouraring/" target="_blank">
          Instagram
        </BodyLink>
      ),
      facebook_link: (
        <BodyLink href="https://www.facebook.com/ouraring/" target="_blank">
          Facebook
        </BodyLink>
      ),
      youtube_link: (
        <BodyLink
          href="https://www.youtube.com/c/Ouraring_%C5%8CURA"
          target="_blank"
        >
          YouTube
        </BodyLink>
      ),
    })}
  </Typography>
);

export default NewsMessage;
