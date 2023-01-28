import Router from 'next/router';
import { getCookie } from '../utils/cookie';

class Analytics {
  constructor(_app) {
    this._app = _app;
    this._isRunning = false;
  }

  destroy() {
    this._isRunning = false;

    this.disableScrollTracking();
    this.disableTimeTracking();
  }

  sendScrollPageEvent(segment) {
    const event = {
      name: 'Page Scrolled',
      params: {
        page: Router.pathname,
        threshold: segment,
      },
    };

    // onsole.log(`[ANALYTICS] event sent: ${event.name} (page: ${event.params.page}, threshold: ${event.params.threshold})`);
    analytics.track(event.name, event.params);
  }

  enableScrollTracking() {
    // // console.loglog('[ANALYTICS] scroll tracking enabled');
    this.previousScrollPosition = null;
    this.maxScrollSegmentSent = null;

    //  console.log('ENABLE SCROLL TRACKING  :: ' )

    /*
            SCROLL EVENTS ALGORITHM

            1. During one page visit we sent an event for specific scroll segment ONLY ONCE
            2. If we start with segment 0.5 (back button), we only send segments that are LOWER, so we never take scroll up into account.

            This is solved by maxScrollSegmentSent variable
         */
    setTimeout(() => {
      this.maxScrollSegmentSent = getScrollSegment(window.scrollY);
    });

    this.scrollListener = () => {
      if (this.previousScrollPosition !== null) {
        // It's not first load
        const previousSegment = getScrollSegment(this.previousScrollPosition);
        const newSegment = getScrollSegment(window.scrollY);

        if (
          previousSegment !== newSegment &&
          newSegment !== 0 &&
          newSegment > this.maxScrollSegmentSent
        ) {
          this.maxScrollSegmentSent = newSegment;
          this.sendScrollPageEvent(newSegment);
        }
      }

      this.previousScrollPosition = window.scrollY;
    };

    window.addEventListener('scroll', this.scrollListener);
  }

  sendTimeOnPageEvent(seconds) {
    const event = {
      name: 'Page Time Spent',
      params: {
        page: Router.pathname,
        seconds: seconds,
      },
    };

    // // console.loglog(`[ANALYTICS] event sent: ${event.name} (page: ${event.params.page}, seconds: ${event.params.seconds})`);
    analytics.track(event.name, event.params);
  }

  enableTimeTracking() {
    // // console.loglog('[ANALYTICS] time on page tracking enabled');

    this.timerCounter = 0;

    // NOTE: Consious Partners asked to remove this timed event
    //
    this.timer = setInterval(() => {
      this.timerCounter++;
      // this.sendTimeOnPageEvent(this.timerCounter * 30);
    }, 1000 * 30); // run every 30 seconds
  }

  disableScrollTracking() {
    // // console.loglog('[ANALYTICS] scroll tracking disabled');
    window.removeEventListener('scroll', this.scrollListener);
  }

  disableTimeTracking() {
    // console.loglog('[ANALYTICS] time on page tracking disabled');
    clearInterval(this.timer);
  }

  start() {
    if (this._isRunning) {
      return;
    }
    this._isRunning = true;

    const included = [
      'ProductPage',
      'Meet the Community',
      'Oura Ring | Accurate Health Information Accessible to Everyone',
    ];

    const runEveryPageLoad = () => {
      const analyticsConfig = this._app.props.Component.meta.analytics || {};

      let name = this._app.props.Component.pageName;
      if (!included.includes(name)) {
        this.disableScrollTracking();
      }
      if (name === 'ProductPage') {
        name = Router.query.handle;
      }

      // console.log(' pageName', this._app.props.Component.pageName )
      // console.log(' Component props ', this._app.props )
      if (name !== 'Cart') {
        const fbc = getCookie('_fbc');
        const fbp = getCookie('_fbp');

        if (typeof analytics?.page === 'function') {
          analytics.page(name, { fbc, fbp });
        }
      }

      // Scroll tracking
      this.disableScrollTracking();
      // if (analyticsConfig && analyticsConfig.enableScrollTracking) {
      this.enableScrollTracking();
      // }

      //  console.log('RUN ON EVERY PAGE :: ', name )

      // Time tracking
      this.disableTimeTracking();
      if (analyticsConfig && analyticsConfig.enableTimeTracking) {
        this.enableTimeTracking();
      }
    };

    const setUpAnalyticsPageEvents = () => {
      if (typeof analytics === 'undefined') {
        // analytics script from Segment is loaded async so we should take into account the fact it might not be there on componentDidMount
        setTimeout(setUpAnalyticsPageEvents, 200);
        return;
      }

      // analytics.js available!
      Router.events.on('routeChangeComplete', () => {
        // analytics.page(); // This event is NOT in runEveryPageLoad, because first load is automatic.
        // console.loglog(`[ANALYTICS] event PageView: ${document.location.href}`);
        runEveryPageLoad();
      });

      // console.loglog(`[ANALYTICS] event PageView: ${document.location.href}`);
      runEveryPageLoad();
    };

    setUpAnalyticsPageEvents();
  }
}

const SCROLL_TRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

function getScrollSegment(windowY) {
  const percent =
    windowY / (document.documentElement.scrollHeight - window.innerHeight);

  for (let i = 0; i < SCROLL_TRESHOLDS.length - 1; i++) {
    if (SCROLL_TRESHOLDS[i] <= percent && percent <= SCROLL_TRESHOLDS[i + 1]) {
      return SCROLL_TRESHOLDS[i];
    }
  }

  return 1;
}

export default Analytics;
