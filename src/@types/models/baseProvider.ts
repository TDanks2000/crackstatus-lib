import { ProviderResponse } from '../types';
import Proxy from './proxy';

abstract class BaseProvider extends Proxy {
  abstract readonly name: string;
  abstract readonly url: string;

  abstract search(query: string, ...args: any[]): Promise<ProviderResponse | null>;
}

export { BaseProvider };
