import { forwardRef, Ref, useEffect } from 'react';
import { VariantId } from '../../../../hooks/useGoogleOptimizeVariant';
import CombinedHeader from '../../../sormus/CombinedHeader';
import Header, { HeaderProps } from '../../../sormus/Header';
import { useHeaderTest } from './useHeaderTest';

export const HeaderTest = forwardRef(function HeaderTest(
  { onHeaderUpdate, ...props }: HeaderProps,
  ref: Ref<HTMLDivElement>,
): JSX.Element {
  const { ready, variantId } = useHeaderTest();

  useEffect(() => {
    if (ready) {
      if (typeof onHeaderUpdate === 'function') {
        onHeaderUpdate(null);
      }
    }
  }, [onHeaderUpdate, props, ready]);
  return (
    <>
      {ready && (
        <>
          {/* {variantId === VariantId.One ? ( */}
          {variantId !== VariantId.One ? (
            <CombinedHeader ref={ref} {...props} />
          ) : (
            <Header ref={ref} {...props} />
          )}
        </>
      )}
    </>
  );
});

export default HeaderTest;
