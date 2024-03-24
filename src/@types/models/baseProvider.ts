import { AxiosRequestConfig } from 'axios';
import { load } from 'cheerio';
import { ProviderInfoResponse, ProviderResponse } from '../types';
import Proxy from './proxy';

/**
 * Represents an abstract base class for providers.
 * @abstract
 * @extends Proxy
 */

abstract class BaseProvider extends Proxy {
  abstract readonly name: string;
  abstract readonly url: string;

  abstract search(
    query: string,
    extraData?: {
      year?: number;
      genres?: string[];
    },
    ...args: any[]
  ): Promise<ProviderResponse | null>;

  abstract info(id: string, ...args: any[]): Promise<ProviderInfoResponse | null>;

  async loadHTML(url: string, options?: AxiosRequestConfig) {
    const result = await this.client.get(url, options);
    return load(result.data);
  }

  sanitizeString(string: string) {
    return string.replace(/[^a-zA-Z0-9 ]/g, '');
  }
}

export { BaseProvider };
