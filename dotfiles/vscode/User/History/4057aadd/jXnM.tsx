import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import styles from './Footer.module.scss';

interface SocialIconProps {
  ariaLabel: string;
  icon: JSX.Element;
  href: string;
}

const SocialIcon = ({ ariaLabel, icon, href }: SocialIconProps) => {
  return (
    <a
      className="inline-block relative w-8 h-8 rounded-full bg-helsinkiBlue text-white hover:bg-helsinkiBlue-dark"
      target="_blank"
      href={href}
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {icon}
      </div>
    </a>
  );
};

const FooterSocialIcons = () => (
  <nav className={styles.social_icons}>
    <div>
      <SocialIcon
        ariaLabel="Instagram"
        href="https://instagram.com/ouraring"
        icon={<InstagramIcon fontSize="small" />}
      />
    </div>
    <div>
      <SocialIcon
        ariaLabel="Twitter"
        href="https://twitter.com/ouraring"
        icon={<TwitterIcon fontSize="small" />}
      />
    </div>
    <div>
      <SocialIcon
        ariaLabel="Facebook"
        href="https://www.facebook.com/ouraring/"
        icon={<FacebookIcon fontSize="small" />}
      />
    </div>
    <div>
      <SocialIcon
        ariaLabel="Youtube"
        href="https://www.youtube.com/c/Ouraring_%C5%8CURA"
        icon={<YouTubeIcon fontSize="small" />}
      />
    </div>
  </nav>
);

export default FooterSocialIcons;
