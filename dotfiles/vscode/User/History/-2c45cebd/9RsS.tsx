import { ReactElement, useState } from 'react';
import { a, useSpring } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import { useA11yContext } from '../../../contexts/A11yContext';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import Typography from '../Typography';

export interface StatProps {
  value: number;
  unit: string;
  label: MessageKey;
  footnoteCharacter?: string;
  className?: string;
}

const Stat = ({
  value,
  unit,
  label,
  footnoteCharacter,
  className,
}: StatProps): ReactElement => {
  const [statVisible, setStatVisible] = useState(false);
  const { prefersReducedMotion } = useA11yContext();

  const spring = useSpring({
    value: statVisible ? value : 0,
    config: { duration: 400 },
  });

  return (
    <div className={className}>
      <Waypoint
        bottomOffset="10%"
        onEnter={() => {
          if (!statVisible) setStatVisible(true);
        }}
      />

      <Typography color="inherit" className="font-light text-4xl">
        <a.span>
          {prefersReducedMotion ? value : spring.value.to((n) => Math.floor(n))}
        </a.span>
        <span>{unit}</span>
      </Typography>

      <Typography color="inherit">
        {t(label, {
          footnoteLink: (
            <sup>
              <a href="#legal-footnotes">{footnoteCharacter}</a>
            </sup>
          ),
        })}
      </Typography>
    </div>
  );
};

export default Stat;
