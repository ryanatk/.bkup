import { useRouter } from 'next/router';
import { useState } from 'react';
import { EventType, sendGTMWithSegmentEvent } from '../../../analytics';
import {
  ExtendedWarrantyType,
  EXTENDED_WARRANTY_1YEAR_ID,
  EXTENDED_WARRANTY_2YEAR_ID,
  EXTENDED_WARRANTY_3YEAR_ID,
} from '../../../consts/extendedWarranty';
import { t } from '../../../public/locales/LocaleContext';
import { s3toImgix } from '../../assetUrls';
import { Button, Typography } from '../../sormus';
import Modal from '../../sormus/Modal';
import WarrantyInfoModal from './ProductSelect/WarrantyInfoModal';
import WarrantySelectorModal from './ProductSelect/WarrantySelectorModal';

const LEARN_MORE_MODAL = 'warranty learn more popup modal';
const WARRANTY_CHOICE_MODAL = 'warranty choice popup modal';

interface ExtendedWarrantyModalProps {
  updateExtendedWarranty?: (arg: number) => void;
  open: any;
  onClose: any;
  infoOnly?: boolean;
}
const ExtendedWarrantyModal = ({
  open,
  onClose,
  infoOnly = false,
  updateExtendedWarranty,
}: ExtendedWarrantyModalProps) => {
  const [extendedWarrantyId, setExtendedWarrantyId] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const imgSrc =
    'https://s3.amazonaws.com/ouraring.com/images/logos/extend-logo.png';
  const location = infoOnly ? LEARN_MORE_MODAL : WARRANTY_CHOICE_MODAL;
  const { asPath } = useRouter();

  /**
   * Handler for extended warranty selection
   */
  const handleExtendedWarrantySelection = (selection: ExtendedWarrantyType) => {
    if (selection !== ExtendedWarrantyType.oneYear) {
      const extendedWarrantyId =
        selection === ExtendedWarrantyType.threeYear
          ? EXTENDED_WARRANTY_3YEAR_ID
          : EXTENDED_WARRANTY_2YEAR_ID;
      setExtendedWarrantyId(extendedWarrantyId);
    } else setExtendedWarrantyId(EXTENDED_WARRANTY_1YEAR_ID);
  };
  const handleAddWarranty = () => {
    updateExtendedWarranty(extendedWarrantyId);
    setModalVisible(false);
  };
  return (
    <>
      {modalVisible && (
        <Modal onClose={onClose} open={open}>
          <div>
            <Typography
              variant="h5"
              Element="h2"
              height="tight"
              className="inline"
            >
              {t('esc_modal_title')}{' '}
            </Typography>
            <span className="inline">
              <img
                alt="extend-logo"
                src={s3toImgix(imgSrc)}
                className="inline h-4 w-18 lg:w-32 lg:h-7 mb-2 lg:mb-4"
              />
              <Typography variant="h5" Element="span">
                .
              </Typography>
            </span>
          </div>
          <div className="mt-4">
            {infoOnly ? (
              <WarrantyInfoModal />
            ) : (
              <>
                <Typography className="text-body lg:text-h6">
                  {t('extended_warranty_select')}:
                </Typography>

                <WarrantySelectorModal
                  onSelect={handleExtendedWarrantySelection}
                />
              </>
            )}
            <div className="text-center mt-8">
              {!infoOnly && (
                <Button
                  data-cy="modal-add-extended-warranty"
                  onClick={handleAddWarranty}
                  className="px-20 lg:px-32"
                >
                  {t('continue')}
                </Button>
              )}
              <div className="mt-6">
                <Button
                  variant="basic"
                  link
                  onClick={() =>
                    sendGTMWithSegmentEvent({
                      type: EventType.ModuleClicked,
                      payload: {
                        cta: 'extend t and c',
                        location: location,
                        path: asPath,
                      },
                    })
                  }
                  href="https://customers.extend.com/warranty_terms/A0-OURA-2y"
                  target="_blank"
                >
                  <Typography variant="eyebrow" className="underline mt-6">
                    {t('extend_terms')}
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ExtendedWarrantyModal;
