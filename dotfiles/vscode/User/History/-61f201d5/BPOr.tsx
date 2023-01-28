import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { EventType, PayloadItems, sendSegmentTrack } from '../../../analytics';
import { DEFAULT_HERITAGE_EXPERIMENT_ID } from '../../../consts/experiments/pdpDefaultHeritage';
import {
  RINGS_BY_FINISH,
  RING_SIZES,
  RING_SIZE_NOT_SELECTED,
} from '../../../consts/ring';
import { RingStyle, useProduct } from '../../../contexts/ProductContext';
import useGoogleOptimizeVariant from '../../../hooks/useGoogleOptimizeVariant';
import usePartnerUtm, { THERABODY_RETAIL } from '../../../hooks/usePartnerUtm';
import useRadioGroupA11y from '../../../hooks/useRadioGroupA11y';
import { t } from '../../../public/locales/LocaleContext';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
import { srcSet } from '../../../utils/imageHelpers';
import { Box, Button, Image, Typography } from '../../sormus';
import { VariantId } from '../../sormus/GoogleOptimize';
import Modal from '../../sormus/Modal';
import SelectButton from '../../sormus/SelectButton';
import ProductSizingModal from './ProductSizingModal';
import ProductStylesModal from './ProductStylesModal';
import StyleBasePrice from './StyleBasePrice';
import useRingsBasePrice from './useRingsBasePrice';

export interface ProductSelectionProps {
  sizeOnly: boolean;
}

const ButtonWrapper = tw.div`
    flex
    flex-1
    gap-2
`;
const StyleLabel = tw.span`
  text-sm
  leading-5
  px-2
`;

const PriceLabel = tw.span`
  text-xs
  leading-4
  px-2
  text-left
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
    availableStyles,
    size,
    style,
    finish,
    setSize,
    setStyle,
    setFinish,
    error,
  } = useProduct();
  const { isMatch: isPartnerTherabody } = usePartnerUtm(THERABODY_RETAIL);
  const [modal, setModal] = useState<boolean>(false);
  const [stylesModal, setStylesModal] = useState<boolean>(false);
  const basePriceForRings = useRingsBasePrice();
  const pdpDefaultHeritageTest = checkFeatureFlag('pdp-default-heritage-test');
  const { ready: defaultHeritageReady, variantId: defaultHeritageVariantId } =
    useGoogleOptimizeVariant(
      DEFAULT_HERITAGE_EXPERIMENT_ID,
      pdpDefaultHeritageTest ? 2000 : 0,
      { experimentName: 'Heritage as Default on PDP' },
    );
  const handleAnalytics = (type: EventType, payload: PayloadItems) => {
    sendSegmentTrack({
      type,
      payload,
    });
  };

  const handleFinishChange = (newFinish: string) => {
    router.push(`/product/${style}-${newFinish}`, undefined, {
      scroll: false,
      shallow: true,
    });
    setFinish(newFinish);
  };

  const handleStyleChange = (newStyle: string) => {
    router.push(`/product/${newStyle}-${finish}`, undefined, {
      scroll: false,
      shallow: true,
    });
    setStyle(newStyle as RingStyle);
  };

  const handleSizeChange = (newSize: string) => {
    handleAnalytics(EventType.OptionClicked, {
      cta: newSize,
      action: 'select_sizing',
      location: 'hero',
    });
    setSize(newSize);
  };

  const { groupRef: styleGroupRef } = useRadioGroupA11y({
    selectedOption: style,
    setSelectedOption: handleStyleChange,
  });

  const { groupRef: finishGroupRef } = useRadioGroupA11y({
    selectedOption: finish,
    setSelectedOption: handleFinishChange,
  });

  const { groupRef: sizeGroupRef } = useRadioGroupA11y({
    selectedOption: size,
    setSelectedOption: handleSizeChange,
  });

  const handleSizeGuideClick = () => {
    handleAnalytics(EventType.ModalOpened, {
      cta: 'size_guide',
      title: 'size_guide',
      location: 'hero',
    });
    setModal(true);
  };
  const handleCompareStylesClick = () => {
    handleAnalytics(EventType.ModalOpened, {
      cta: 'size_guide',
      title: 'size_guide',
      location: 'hero',
    });
    setStylesModal(true);
  };

  const { product } = useProduct();

  useEffect(() => {
    if (!product?.handle) {
      return;
    }

    if (product?.handle && !sizeOnly && !isPartnerTherabody && !size) {
      setSize(RING_SIZE_NOT_SELECTED);
    }

    if (product?.handle && sizeOnly && size === RING_SIZE_NOT_SELECTED) {
      setSize(null);
    }

    if (!sizeOnly && !isPartnerTherabody && !size) {
      setSize(RING_SIZE_NOT_SELECTED);
    }
  }, [sizeOnly, isPartnerTherabody, size, setSize, product]);

  return (
    <>
      {!sizeOnly && (
        <>
          <div css={tw`mt-5 mb-5`}>
            <div className="flex justify-between mb-2">
              <Typography color="grayscale-text" id="style-group-label">
                {t('pdp_horizon_style')}
              </Typography>
              <Button
                variant="body-link"
                className="text-helsinkiBlue-light"
                onClick={handleCompareStylesClick}
              >
                {t('pdp_compare_styles')}
              </Button>
            </div>
            {defaultHeritageReady && (
              <ButtonWrapper
                ref={styleGroupRef}
                role="radiogroup"
                aria-labelledby="style-group-label"
                tabIndex={-1}
                className={`${
                  defaultHeritageVariantId === VariantId.One
                    ? 'flex-row-reverse'
                    : ''
                }`}
              >
                <SelectButton
                  className="flex items-center p-2"
                  labelStyles={tw`flex flex-col items-start mt-0`}
                  label={
                    <>
                      <StyleLabel>{t('pdp_style_horizon')}</StyleLabel>
                      {basePriceForRings && (
                        <PriceLabel>
                          <StyleBasePrice style={RingStyle.Horizon} />
                        </PriceLabel>
                      )}
                    </>
                  }
                  value="horizon"
                  isDisabled={!availableStyles?.horizon}
                  isSelected={style === RingStyle.Horizon}
                  onClick={() => {
                    handleStyleChange('horizon');
                  }}
                  image={
                    <Image
                      alt={`ring-style-horizon`}
                      {...srcSet(
                        'product/style/style-thumb-horizon@2x',
                        'png',
                        [45],
                        '',
                        { w: 45 },
                      )}
                    />
                  }
                />
                <SelectButton
                  className="flex items-center p-2"
                  labelStyles={tw`flex flex-col items-start mt-0`}
                  label={
                    <>
                      <StyleLabel>{t('pdp_style_heritage')}</StyleLabel>
                      {basePriceForRings && (
                        <PriceLabel>
                          <StyleBasePrice style={RingStyle.Heritage} />
                        </PriceLabel>
                      )}
                    </>
                  }
                  value="heritage"
                  isDisabled={!availableStyles?.heritage}
                  isSelected={style === RingStyle.Heritage}
                  onClick={() => {
                    handleStyleChange('heritage');
                  }}
                  image={
                    <Image
                      alt={`ring-style-horizon`}
                      {...srcSet(
                        'product/style/style-thumb-heritage@2x',
                        'png',
                        [45],
                        '',
                        { w: 45 },
                      )}
                    />
                  }
                />
              </ButtonWrapper>
            )}
          </div>
          <div css={tw`my-8`}>
            <Typography
              className="mb-2"
              color="grayscale-text"
              id="finish-group-label"
            >
              {t('pdp_horizon_finish')}
            </Typography>
            <ButtonWrapper
              ref={finishGroupRef}
              role="radiogroup"
              tabIndex={-1}
              aria-labelledby="finish-group-label"
            >
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
                  onClick={() => {
                    handleFinishChange(ring.finish.slug);
                  }}
                />
              ))}
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
        <div className="flex justify-between mb-2">
          <Typography
            className={cx({ 'sr-only': !!error })}
            color="grayscale-text"
            data-cy="label-select-size"
            id="sizing-group-label"
          >
            {t('pdp_horizon_sizing_label')}
          </Typography>
          {!!error && (
            <Typography
              className="text-warning"
              data-cy="label-warning-size"
              id="sizing-group-error"
            >
              {t('pdp_horizon_sizing_warning')}
            </Typography>
          )}
          <Button
            variant="body-link"
            className="text-helsinkiBlue-light"
            onClick={handleSizeGuideClick}
          >
            {t('pdp_horizon_sizing_modal_link')}
          </Button>
        </div>
        <ButtonWrapper
          ref={sizeGroupRef}
          role="radiogroup"
          tabIndex={-1}
          aria-labelledby="size-group-label"
          aria-errormessage={error ? 'size-group-error' : null}
          tw="flex-wrap"
        >
          {!sizeOnly && !isPartnerTherabody && (
            <SelectButton
              className="w-full"
              label={t('pdp_horizon_sizing_free_sizing_kit')}
              isSelected={size === RING_SIZE_NOT_SELECTED}
              value={RING_SIZE_NOT_SELECTED}
              onClick={() => {
                handleSizeChange(RING_SIZE_NOT_SELECTED);
              }}
              data-cy={`button-select-size-later`}
            />
          )}
          {RING_SIZES.map((_size) => (
            <SelectButton
              key={`size-${_size}`}
              css={tw`w-1/5`}
              isSelected={size === _size}
              label={_size}
              value={_size}
              onClick={() => {
                handleSizeChange(_size);
              }}
              data-cy={
                size === _size
                  ? `button-selected-size-${_size}`
                  : `button-select-size-${_size}`
              }
            />
          ))}
        </ButtonWrapper>
      </SizeBox>
      <Modal open={modal} onClose={() => setModal(false)}>
        <ProductSizingModal />
      </Modal>
      <Modal open={stylesModal} onClose={() => setStylesModal(false)}>
        <ProductStylesModal />
      </Modal>
    </>
  );
};

export default ProductSelection;
