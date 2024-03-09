import { BaseProvider, ProviderInfoResponse, ProviderResponse } from '../@types';
/**
 * Class representing the Elamigos provider.
 * @extends BaseProvider
 */
export declare class Elamigos extends BaseProvider {
    name: string;
    url: string;
    /**
     * Searches for a matching item in the provided URL
     * @param {string} query - The search query to be used
     * @returns {Promise<ProviderResponse | null>} - A promise that resolves to the scraped data if a match is found, otherwise null
     */
    search(query: string): Promise<ProviderResponse | null>;
    /**
     * Retrieves information about a provider from a given URL.
     *
     * @param {string} url - The URL of the provider's information page.
     * @returns {Promise<ProviderInfoResponse>} - A promise that resolves to an object containing the provider's information.
     */
    info(url: string): Promise<ProviderInfoResponse>;
}
//# sourceMappingURL=elamigos.d.ts.map