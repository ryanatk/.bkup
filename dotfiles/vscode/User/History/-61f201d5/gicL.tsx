import { useRouter } from 'next/router';
import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import {
  EventType,
  PayloadItems,
  sendGTMWithSegmentEvent,
} from '../../../analytics';
import {
  RINGS_BY_FINISH,
  RING_SIZES,
  RING_SIZE_NOT_SELECTED,
} from '../../../consts/ring';
import { RingStyle, useProduct } from '../../../contexts/ProductContext';
import { t } from '../../../public/locales/LocaleContext';
import { srcSet } from '../../../utils/imageHelpers';
import { Box, Button, Image, Typography } from '../../sormus';
import Modal from '../../sormus/Modal';
import SelectButton from '../../sormus/SelectButton';
import ProductSizingModal from './ProductSizingModal';

export interface ProductSelectionProps {
  sizeOnly: boolean;
}

const ButtonWrapper = tw.div`
    flex
    flex-1
    gap-2
`;

const SizeBox = styled(Box)(({ error }) => [
  tw`
    border 
    border-transparent
  `,
  error &&
    tw`
      border-warning 
      rounded
    `,
]);

const padVertical = tw`
  -mx-4
  my-4
`;

const noPadVertical = tw`
  -mx-4
  -my-4
`;

const ProductSelection = ({
  sizeOnly = false,
}: ProductSelectionProps): JSX.Element => {
  const router = useRouter();
  const {
    handleUpdateSize,
    availableStyles,
    style,
    finish,
    error,
    size: selectedSize,
  } = useProduct();
  const [modal, setModal] = useState<boolean>(false);

  const handleAnalytics = (type: EventType, payload: PayloadItems) => {
    sendGTMWithSegmentEvent({
      type,
      payload,
    });
  };

  const handleFinishChange = ({ currentTarget }) =>
    router.push(`/product/${style}-${currentTarget.value}`, undefined, {
      scroll: false,
    });

  const handleStyleChange = ({ currentTarget }) =>
    router.push(`/product/${currentTarget.value}-${finish}`, undefined, {
      scroll: false,
    });

  const handleSizeChange = ({ currentTarget }) => {
    const value = currentTarget.value;
    handleAnalytics(EventType.OptionClicked, {
      cta: value,
      action: 'select_sizing',
      location: 'hero',
    });
    handleUpdateSize(value);
  };

  const handleSizeGuideClick = () => {
    handleAnalytics(EventType.ModalOpened, {
      cta: 'size_guide',
      title: 'size_guide',
      location: 'hero',
    });
    setModal(true);
  };

  return (
    <>
      {!sizeOnly && (
        <>
          <div css={tw`my-8`}>
            <Typography className="mb-2">{t('pdp_horizon_finish')}</Typography>
            <ButtonWrapper>
              {RINGS_BY_FINISH.map((ring, i) => (
                <SelectButton
                  key={`ring-${i}`}
                  css={tw`
                    flex
                    flex-col
                    items-center
                    justify-start
                    w-1/6
                  `}
                  label={t(ring.finish.label)}
                  labelStyles={tw`lg:leading-5`}
                  value={ring.finish.slug}
                  isDisabled={!ring.styles[style]}
                  isSelected={finish === ring.finish.slug}
                  image={
                    <Image
                      alt={`ring-swatch-${ring.finish.slug}`}
                      css={tw`rounded-full`}
                      {...srcSet(ring.swatch, 'png', [30], '', { w: 30 })}
                    />
                  }
                  onClick={handleFinishChange}
                />
              ))}
            </ButtonWrapper>
          </div>
          <div css={tw`mb-8`}>
            <Typography className="mb-2">{t('pdp_horizon_style')}</Typography>
            <ButtonWrapper>
              <SelectButton
                label="Horizon"
                value="horizon"
                isDisabled={!availableStyles?.horizon}
                isSelected={style === RingStyle.Horizon}
                onClick={handleStyleChange}
              />
              <SelectButton
                label="Heritage"
                value="heritage"
                isDisabled={!availableStyles?.heritage}
                isSelected={style === RingStyle.Heritage}
                onClick={handleStyleChange}
              />
            </ButtonWrapper>
          </div>
        </>
      )}
      <SizeBox
        {...{ error }}
        paddingX={1}
        paddingY={1}
        css={sizeOnly ? padVertical : noPadVertical}
      >
        <div className="flex justify-between">
          <Typography
            className={`mb-2 ${error && 'text-warning'}`}
            data-cy={error ? `label-warning-size` : `label-select-size`}
          >
            {error
              ? t('pdp_horizon_sizing_warning')
              : t('pdp_horizon_sizing_label')}
          </Typography>
          <Button variant="body-link" onClick={handleSizeGuideClick}>
            {t('pdp_horizon_sizing_modal_link')}
          </Button>
        </div>
        <ButtonWrapper tw="flex-wrap">
          {!sizeOnly && (
            <SelectButton
              className="w-full"
              label={t('pdp_horizon_sizing_modal_link')}
              isSelected={selectedSize === RING_SIZE_NOT_SELECTED}
              value={RING_SIZE_NOT_SELECTED}
              onClick={handleSizeChange}
              data-cy={`button-select-size-later`}
            />
          )}
          {RING_SIZES.map((size) => (
            <SelectButton
              key={`size-${size}`}
              css={tw`w-1/5`}
              isSelected={selectedSize === size}
              label={size}
              value={size}
              onClick={handleSizeChange}
              data-cy={
                selectedSize === size
                  ? `button-selected-size-${size}`
                  : `button-select-size-${size}`
              }
            />
          ))}
        </ButtonWrapper>
      </SizeBox>
      <Modal open={modal} onClose={() => setModal(false)}>
        <ProductSizingModal />
      </Modal>
    </>
  );
};

export default ProductSelection;
