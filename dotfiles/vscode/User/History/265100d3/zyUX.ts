import { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    google_optimize: any;
  }
}

export enum VariantId {
  Zero = '0',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
}

const delay = 100;

const useGoogleOptimizeVariant = (experimentId: string, maxWait = 2000) => {
  const [variantId, setVariantId] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!variantId || typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({ event: 'optimize.activate' });
    window.dataLayer.push({
      expID: experimentId,
      expVar: variantId,
      eventCallback: (() => {
        setReady(true);
      })(),
    });
  }, [variantId, experimentId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track interval cycles
    let intervalCycles = 0;

    const interval = setInterval(() => {
      if (window.google_optimize?.get) {
        const variantId = window.google_optimize.get(experimentId);

        clearInterval(interval);

        if (variantId) {
          setVariantId(variantId);
        } else {
          setReady(true);
        }
      }

      // If number of interval cycles is too many, bail
      // We don't want to delay the render if google_optimize is slow, or non-existent
      if (++intervalCycles >= maxWait / delay) {
        clearInterval(interval);
        setReady(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return { variantId, ready };
};

export default useGoogleOptimizeVariant;
