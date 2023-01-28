/**
 * More params can be added here, when applicable.
 *
 * Note that each can be a string or an array of strings, because:
 * 1. consumer can match on a list of values for a single key
 * 2. url query params can include multiple values for the same key
 */
export interface PartnerUtm {
  utm_medium?: string | string[];
  utm_source?: string | string[];
  utm_campaign?: string | string[];
  utm_content?: string | string[];
}
