/**
 * Helper class to send events to our backend API.
 *
 * This helper does batching to reduce network requests- it will ping the API
 * at most once every 5 seconds with the latest batch of events.
 */

import backendAPI from './backendAPI';
import errorHandler from './errorHandler';

// Flush delay:
// - When running in browser, use a short delay (100ms) so that we hopefully don't
//   lose events when the browser tab is closed.
// - When running in server, use a longer delay (5sec) to batch lots of metrics into
//   fewer network calls, and we aren't as worried about losing events.

let FlushDelayMs = 100;

if (typeof window === 'undefined')
  // Running in server.
  FlushDelayMs = 5000;

export default class MetricsToAPI {
  // endpoint: string;
  endpoint: any;
  addCounts = new Map<string, number>();
  timer = null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  increment(name: string, params?: any) {
    try {
      let fullString = name;
      if (params) {
        fullString += ' ' + JSON.stringify(params);
      }

      this.addCounts.set(fullString, (this.addCounts.get(fullString) || 0) + 1);

      if (!this.timer) {
        this.timer = setTimeout(() => this.flush(), FlushDelayMs);
      }
    } catch (e) {
      console.error(e);
    }
  }

  flush() {
    const add = [];
    for (const [name, count] of Array.from(this.addCounts.entries()))
      add.push({ name, count });

    const postBody = {
      add,
    };

    this.addCounts.clear();
    this.timer = null;

    backendAPI.post(this.endpoint, postBody).catch((err) => {
      errorHandler(err);
    });
  }
}
