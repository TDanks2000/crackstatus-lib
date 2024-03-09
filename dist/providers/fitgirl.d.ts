import { BaseProvider, ProviderInfoResponse, ProviderResponse } from '../@types';
/**
 * FitGirl class.
 *
 * @extends BaseProvider
 */
export declare class FitGirl extends BaseProvider {
    name: string;
    url: string;
    /**
     * Searches for a query within the provider's website.
     *
     * @param {string} query - The query to search for.
     * @returns {Promise<ProviderResponse | null>} A promise that resolves to the scraped data if found, or null otherwise.
     */
    search(query: string): Promise<ProviderResponse | null>;
    /**
     * Retrieves information from a given URL.
     *
     * @param {string} url - The URL to fetch data from.
     * @returns {Promise<ProviderInfoResponse>} The provider info response object.
     */
    info(url: string): Promise<ProviderInfoResponse>;
}
//# sourceMappingURL=fitgirl.d.ts.map