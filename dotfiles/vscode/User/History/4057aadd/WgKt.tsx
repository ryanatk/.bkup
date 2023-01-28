import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CircularIcon from '../CircularIcon';
import styles from './Footer.module.scss';

const FooterSocialIcons = () => (
  <nav className={styles.social_icons} aria-label="social-icons-nav">
    <div>
      <CircularIcon
        ariaLabel="Instagram"
        href="https://instagram.com/ouraring"
        icon={<InstagramIcon fontSize="small" />}
      />
    </div>
    <div>
      <CircularIcon
        ariaLabel="Twitter"
        href="https://twitter.com/ouraring"
        icon={<TwitterIcon fontSize="small" />}
      />
    </div>
    <div>
      <CircularIcon
        ariaLabel="Facebook"
        href="https://www.facebook.com/ouraring/"
        icon={<FacebookIcon fontSize="small" />}
      />
    </div>
    <div>
      <CircularIcon
        ariaLabel="Youtube"
        href="https://www.youtube.com/c/Ouraring_%C5%8CURA"
        icon={<YouTubeIcon fontSize="small" />}
      />
    </div>
  </nav>
);

export default FooterSocialIcons;
