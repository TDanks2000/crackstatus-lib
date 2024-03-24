import { AxiosRequestConfig } from 'axios';
import { ProviderInfoResponse, ProviderResponse } from '../types';
import Proxy from './proxy';
/**
 * Represents an abstract base class for providers.
 * @abstract
 * @extends Proxy
 */
declare abstract class BaseProvider extends Proxy {
    abstract readonly name: string;
    abstract readonly url: string;
    abstract search(query: string, extraData?: {
        year?: number;
        genres?: string[];
    }, ...args: any[]): Promise<ProviderResponse[] | null>;
    abstract info(id: string, ...args: any[]): Promise<ProviderInfoResponse | null>;
    loadHTML(url: string, options?: AxiosRequestConfig): Promise<import("cheerio").CheerioAPI>;
    sanitizeString(string: string): string;
}
export { BaseProvider };
//# sourceMappingURL=baseProvider.d.ts.map