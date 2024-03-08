import { ProviderResponse } from '../types';
import Proxy from './proxy';

/**
 * Represents an abstract base class for providers.
 * @abstract
 * @extends Proxy
 */
// TODO: Tommy should it return only 1 results when searching? what if u search witcher and u want too see all results?
abstract class BaseProvider extends Proxy {
  abstract readonly name: string;
  abstract readonly url: string;

  abstract search(query: string, ...args: any[]): Promise<ProviderResponse | null>;
}

export { BaseProvider };
