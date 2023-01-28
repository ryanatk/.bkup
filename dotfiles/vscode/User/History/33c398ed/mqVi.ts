// Utility functions
import crypto from 'crypto';
import sellToCountries from '../static/data/countries.json';

const countries = Object.values(sellToCountries).map(({ name, sellTo }) => ({
  name,
  sellTo,
}));
console.log({ countries });

interface SellToCountry {
  countryCode: string;
  currency: string;
  merchant: { prod: string; staging: string };
  eu: boolean;
  name: string;
  regions: any[];
  shipFrom: string;
  shippingRate: { description?: string; price: number };
  freight_taxable: boolean;
  sellTo: boolean;
  calling_code: string;
}

export default class Utils {
  /**
   * Normalize unicode normal form (NFD)
   */
  static normalizeStringToNFD(str: any): any {
    if (
      (typeof str === 'string' || str instanceof String) &&
      str.length <= 255
    ) {
      return str.trim().normalize('NFKD');
      // .replace(/[\u0300-\u036f]/g, ''); // TODO: check with the team to see if this is needed.
    } else {
      return str;
    }
  }

  /**
   * Normalize object content to unicode normal form (NFD) - shallow normilization - 1 level
   */

  static normalizeObjectToNFD(obj: any): any {
    if (
      (typeof obj === 'object' || obj instanceof Object) &&
      Object.keys(obj).length <= 64
    ) {
      for (const [key, value] of Object.entries(obj)) {
        obj[key] = this.normalizeStringToNFD(value);
      }
      return obj;
    } else {
      return obj;
    }
  }

  /**
   * Get list of sell to countries
   */
  static getSellToCountriesList(): {
    label: string;
    value: string;
    disableForBilboLaunch: boolean;
  }[] {
    return Object.keys(sellToCountries)
      .filter((c) => sellToCountries[c].sellTo !== false)
      .map((c) => {
        return {
          label: `${sellToCountries[c].name}`,
          value: sellToCountries[c].countryCode,
          disableForBilboLaunch: sellToCountries[c].disableForBilboLaunch,
        };
      });
  }

  /**
   * Get list of sell to countries Calling_Codes
   */
  static getCountryCallingCodes(): {
    key: string;
    value: string;
    flag: string;
    text: string;
  }[] {
    return Object.keys(sellToCountries).map((c) => {
      const obj = {
        key: sellToCountries[c].countryCode,
        value: sellToCountries[c].countryCode,
        flag: sellToCountries[c].countryCode.toLowerCase(),
        text: sellToCountries[c].calling_code,
      };
      if (sellToCountries[c].sellTo) return obj;
    });
  }

  /**
   * Get a single calling_code
   */
  static getCountryCallingCode(code: string): string | false {
    if (sellToCountries[code] && sellToCountries[code].calling_code) {
      return sellToCountries[code].calling_code;
    }
    return false;
  }

  /**
   * Get a specific sell to country based on Country code (ISO 3166)
   */
  static getSellToCountry(countryCode: string): SellToCountry | false {
    if (!countryCode) return false;
    return sellToCountries[countryCode];
  }

  /**
   * Get a specific country full name based on Country code (ISO 3166)
   */
  static getCountryFullName(
    countryCode: string,
  ): SellToCountry['name'] | false {
    if (!countryCode) return false;
    return sellToCountries[countryCode].name || false;
  }

  /**
   * Get external user IP address
   */
  static getRemoteAddress(req: {
    headers: { [x: string]: string };
    connection: { remoteAddress: any; socket: { remoteAddress: any } };
    socket: { remoteAddress: any };
  }): string {
    if (!req || !req.headers) return '';

    // req.headers["x-forwarded-for"] = '185.108.107.29'; // testing FI ip address
    const forwarded = req.headers['x-forwarded-for'] || false;

    if (!forwarded) {
      return (
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        ''
      );
    } else {
      return forwarded.split(/, /)[0];
    }
  }

  /**
   * Get window location object
   */
  static getWindowQuery(): Location {
    return window.location;
  }
  /**
   * This deducts shop enviroment based on regions
   */
  static getRegionForOrder(countryCode: string): string {
    const country = this.getSellToCountry(countryCode);
    if (!country) return 'Rest';
    if (country.eu) return 'Europe';
    else if (country.currency === 'JPY') return 'Japan';
    else return 'Rest';
  }
  /**
   * Paypal to checkout form
   */
  static convertPaypalPayload(payment: {
    address: {
      recipient_name: string;
      line1: string;
      line2: string;
      city: string;
      country_code: string;
      state: string;
      postal_code: string;
    };
  }): {
    fname: string;
    lname: string;
    address: string;
    address2: string;
    city: string;
    country: string;
    state: string;
    postal: string;
  } {
    const shippingAddress = {
      fname: payment.address.recipient_name.split(' ')[0],
      lname: payment.address.recipient_name.split(' ')[1],
      address: payment.address.line1,
      address2: payment.address.line2,
      city: payment.address.city,
      country: payment.address.country_code,
      state: payment.address.state,
      postal: payment.address.postal_code,
    };
    return shippingAddress;
  }

  /**
   * SHA256 hasher
   */
  static hashString(string: string): string {
    const lowerCase = string.toLowerCase();
    const removeWhiteSpace = lowerCase.trim();
    const hashedString = crypto
      .createHash('sha256')
      .update(removeWhiteSpace)
      .digest('hex');
    return hashedString;
  }
}
