import { render, screen, configure } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../Hero';
import * as checkFeatureFlag from '../../../../utils/checkFeatureFlag';
import { useA11yContext } from '../../../../contexts/A11yContext';
import HERO_VARIANTS from '../Hero/hero-variants';

configure({ testIdAttribute: 'data-cy' });

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => ({
    flags: {},
  })),
}));

jest.mock('../../../../contexts/HeaderContext', () => ({
  useHeaderContext: () => ({
    setInverse: jest.fn(),
  }),
}));

jest.mock('../../../../contexts/A11yContext', () => ({
  useA11yContext: jest.fn().mockReturnValue({
    prefersReducedMotion: false,
  }),
}));

jest.mock('../../../../utils/checkFeatureFlag', () => jest.fn());

jest.mock('../../../../hooks/useMediaQuery', () => jest.fn());

jest.mock('../../../../public/locales/LocaleContext', () => ({
  t: jest.fn().mockReturnValue('Mocked string'),
}));

jest.mock('react-intl', () => ({
  useIntl: () => ({
    formatMessage: jest.fn().mockReturnValue('Mocked string'),
  }),
  FormattedMessage: jest.fn().mockReturnValue('Mocked string'),
}));

const featureFlagMock = jest.spyOn(checkFeatureFlag, 'default');

describe('components > pages > home-simple > Hero', () => {
  it('Shows hero and title text', () => {
    featureFlagMock.mockReturnValueOnce(false); // enable-horizon-home-video
    const IMAGE_URL = HERO_VARIANTS[0].background.mobile;
    render(<Hero headerHeight={100} />);

    const normalBody = screen.queryByTestId('hero-body');
    const normalTitle = screen.queryByTestId('hero-title');
    const bgImage = screen.queryByTestId('hero-background-image');

    expect(normalBody).toBeTruthy();
    expect(normalTitle).toBeTruthy();

    expect(bgImage.getAttribute('src')).toContain(IMAGE_URL);
  });

  it(`Shows background video when flag is enabled and user doesn't prefer reduced motion`, () => {
    useA11yContext.mockReturnValueOnce({ prefersReducedMotion: false });
    featureFlagMock.mockReturnValueOnce(true); // enable-horizon-home-video
    const VIDEO_URL = 'm-homepage-hero-video';
    render(<Hero headerHeight={100} />);

    const bgImage = screen.queryByTestId('hero-background-image');
    const bgVideo = screen.queryByTestId('hero-background-video');

    expect(bgImage).toBeFalsy();
    expect(bgVideo).toBeTruthy();

    expect(bgVideo.querySelector('source').getAttribute('src')).toContain(
      VIDEO_URL,
    );
  });

  it(`Hides background video when flag is enabled and user prefers reduced motion`, () => {
    useA11yContext.mockReturnValueOnce({ prefersReducedMotion: true });
    featureFlagMock.mockReturnValueOnce(true); // enable-horizon-home-video
    render(<Hero headerHeight={100} />);

    const bgImage = screen.queryByTestId('hero-background-image');
    const bgVideo = screen.queryByTestId('hero-background-video');

    expect(bgImage).toBeTruthy();
    expect(bgVideo).toBeFalsy();
  });
});
