import { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import tw, { styled, theme } from 'twin.macro';
import { useA11yContext } from '../../../contexts/A11yContext';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { src } from '../../../utils/imageHelpers';
import { Image } from '../../sormus';

interface AccoladeDataType {
  quote: MessageKey;
  source: {
    name: string;
    logo: string;
  };
}

const accoladesData: AccoladeDataType[] = [
  {
    quote: 'simple_home_accolades_usa_today',
    source: {
      name: 'USA Today',
      logo: src('simple-home/usa-today-logo', 'svg'),
    },
  },
  {
    quote: 'simple_home_accolades_wareable',
    source: {
      name: 'Wareable',
      logo: src('simple-home/wareable-logo', 'svg'),
    },
  },
  {
    quote: 'simple_home_accolades_washington_post',
    source: {
      name: 'Washington Post',
      logo: src('simple-home/washington-post-logo', 'svg'),
    },
  },
];

const Wrapper = styled.div(
  ({ prefersReducedMotion }: { prefersReducedMotion: boolean }) => [
    tw`
    bg-white
    10
  `,
    {
      // For users with reduced motion, allow them to manually scroll
      overflowX: prefersReducedMotion ? 'auto' : 'hidden',
    },
  ],
);

const List = styled.ul(({ $scrolling }: { $scrolling: boolean }) => [
  $scrolling && tw`motion-safe:animate-simpleHomePressTicker`,
  tw`
    inline-flex
    items-center
  `,
]);

const ListItem = styled.li(() => [
  tw`
    flex-shrink-0
    px-5
    relative
    text-helsinkiBlue-dark
    lg:(px-9)
  `,
  `
    &:last-child {
      &:after {
        display: none;
      }
    }
    &:after {
      content: "";
      background-color: currentColor;
      border-radius: 50%;
      display: block;
      height: 8px;
      width: 8px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      @media (min-width: ${theme`screens.lg`}) {
        height: 10px;
        width: 10px;
      }
    }
  `,
]);

const Accolade = tw.blockquote`
  flex
  flex-row-reverse
  items-center
`;

const AccoladeText = styled.p(() => [
  tw`
    text-xl
    whitespace-nowrap
    lg:(text-3xl)
  `,
  `
    &:before {
      content: "“";
    }
    &:after {
      content: "”";
    }
  `,
]);

const AccoladeFooter = tw.footer`
  flex-shrink-0
  mr-6
  lg:(mr-8)
`;

const AccoladeLogo = tw(Image)`
  h-6
  max-w-none
  lg:(h-9)
`;

const Accolades = (): JSX.Element => {
  const { prefersReducedMotion } = useA11yContext();
  const [scrolling, setScrolling] = useState(false);
  // If the user has motion enabled, dupe the items to help with infinite looping
  const items = prefersReducedMotion
    ? accoladesData
    : [...accoladesData, ...accoladesData];
  return (
    <Wrapper prefersReducedMotion={prefersReducedMotion}>
      <Waypoint
        topOffset="50%"
        scrollableAncestor={window}
        onEnter={() => {
          setScrolling(true);
        }}
      />
      <List $scrolling={scrolling}>
        {/* Hide duped items from screen readers */}
        {items.map((item, i) => (
          <ListItem key={i} aria-hidden={i >= accoladesData.length}>
            <Accolade>
              <AccoladeText>{t(item.quote)}</AccoladeText>
              <AccoladeFooter>
                <AccoladeLogo sc={item.source.logo} alt={item.source.name} />
              </AccoladeFooter>
            </Accolade>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};

export default Accolades;
