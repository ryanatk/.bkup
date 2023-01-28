import { ConsentManagerBuilder } from '@segment/consent-manager';
import { useState } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { getCookie } from '../../../utils/cookie';
import getWindow from '../../../utils/getWindow';
import BodyLink from '../../sormus/BodyLink';
import Box from '../../sormus/Box';
import Button from '../../sormus/Button';
import Typography from '../../sormus/Typography';
import defaultPreferencesDialogTemplate from './defaultPreferencesTemplate';
import PreferencesDialog from './PreferencesDialog';
import { CategoryPreferences, Destination } from './segmentTypes';
import { normalizeDestinations } from './segmentUtilities';

const saveCustomPreferences = (value = null) => {
  const preferences = {};
  defaultPreferencesDialogTemplate.categories.forEach(
    (category) => (preferences[category.key] = value),
  );
  return preferences;
};

const generateDefaultPreferences = (isEU) => {
  const window = getWindow();
  if (isEU || window.Cypress) return saveCustomPreferences();
  return saveCustomPreferences(true);
};

/*
 ** mapping destinations to our categories we expose to the user
 ** this gets fired on saveConsent
 */
const mapCustomPreferences = (
  destinations: Destination[],
  preferences: CategoryPreferences,
) => {
  // object to store preferences for each destination
  const destinationPreferences = {};
  // object to store preferences for each category
  const customPreferences = preferences;
  // reference of all our possible categories
  const customCategories = defaultPreferencesDialogTemplate.categories;

  customCategories.forEach((category) => {
    destinations.forEach((destination) => {
      // if destination matches current category
      if (category.types.includes(destination.category)) {
        const consentAlreadySetToFalse =
          destinationPreferences[destination.id] === false;
        if (!consentAlreadySetToFalse) {
          destinationPreferences[destination.id] =
            customPreferences[category.key];
        }
      }
    });
  });

  return { destinationPreferences, customPreferences };
};

const CookieManager = ({ isEU = true }) => {
  const hasPreferences = getCookie('tracking-preferences');
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(!hasPreferences);
  const defaultPreferences = generateDefaultPreferences(isEU);

  const handleShowBanner = () => setBannerVisible(true);

  const handleHideBanner = () => setBannerVisible(false);

  const handleClosePreferences = () => {
    setPreferencesOpen(false);
  };

  const handleOpenPreferences = () => {
    setPreferencesOpen(true);
  };

  const handleCheckForNewDestinations = (newDestinationsAdded) => {
    if (newDestinationsAdded) handleShowBanner();
  };

  const handleCloseBanner = () => {
    handleClosePreferences();
    handleHideBanner();
  };

  return (
    <ConsentManagerBuilder
      writeKey={process.env.SEGMENT_KEY}
      mapCustomPreferences={mapCustomPreferences}
      initialPreferences={defaultPreferences}
    >
      {({
        destinations,
        preferences,
        setPreferences,
        saveConsent,
        havePreferencesChanged,
        workspaceAddedNewDestinations,
      }) => {
        handleCheckForNewDestinations(workspaceAddedNewDestinations);
        const destinationCategories = normalizeDestinations(destinations);

        const handleSave = (valueForAll) => {
          if (valueForAll) setPreferences(saveCustomPreferences(valueForAll));
          saveConsent();
          handleCloseBanner();
        };

        // if (!isEU) handleCloseBanner();

        return (
          <div className="tailwind">
            {bannerVisible && (
              <>
                <div className="fixed bottom-0 w-screen bg-white py-8 z-50 border-t border-t-helsinkiBlue">
                  <Box className="flex flex-col lg:flex-row lg:justify-around items-start lg:items-center">
                    <div className="md:w-2/3">
                      <Typography variant="h5" className="mb-4">
                        {t('cookie_title')}
                      </Typography>
                      <Typography variant="caption">
                        {t('banner_content', {
                          managecookies_link: (
                            <button
                              id="open-consent"
                              onClick={handleOpenPreferences}
                            >
                              <BodyLink data-cy="managecookies">
                                {t('manage_cookies')}
                              </BodyLink>
                            </button>
                          ),
                          accept_link: (
                            <button
                              id="accept-all"
                              onClick={() => handleSave(true)}
                            >
                              <BodyLink data-cy="acceptcookies">
                                {t('accept_cookies')}
                              </BodyLink>
                            </button>
                          ),
                        })}
                      </Typography>
                    </div>
                    <div className="mt-4 flex-row gap-4 items-center lg:flex-row-reverse">
                      <Button
                        variant="primary"
                        id="accept"
                        onClick={() => handleSave(true)}
                        data-cy="button-accept-all-cookies"
                      >
                        {t('banner_accept_all')}
                      </Button>
                      <Button
                        variant="basic"
                        className="text-helsinkiBlue"
                        data-cy="manage_cookies"
                        onClick={handleOpenPreferences}
                      >
                        {t('manage_cookies')}
                      </Button>
                    </div>
                  </Box>
                </div>
              </>
            )}

            <PreferencesDialog
              havePreferencesChanged={havePreferencesChanged}
              open={preferencesOpen}
              onClose={handleClosePreferences}
              setPreferences={setPreferences}
              preferences={preferences}
              handleSave={handleSave}
              destinationCategories={destinationCategories}
            />
          </div>
        );
      }}
    </ConsentManagerBuilder>
  );
};

export default CookieManager;
