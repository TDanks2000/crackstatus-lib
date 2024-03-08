import axios from 'axios';
import * as cheerio from 'cheerio';
import {BaseProvider, Link, ProviderInfoResponse, ProviderResponse} from "../@types";


 /**
  * Fetches data from the given URL and returns the loaded HTML content.
  *
  * @param {string} url - The URL to fetch data from.
  * @returns {Promise<CheerioStatic>} - A promise that resolves to the loaded HTML content.
  */
 async function fetchData(url: string) {
    const result = await axios.get(url);
    return cheerio.load(result.data);
}


/**
 * Elamigos class is a subclass of BaseProvider that represents the Elamigos provider.
 * It provides functionality to search for a specific query and get information about a URL.
 */
export class Elamigos extends BaseProvider {
    name: string = 'elamigos';
    url: string = 'https://www.elamigos.site/';

    /**
     * Searches for a matching title in a fetched HTML content.
     *
     * @param {string} query - The query string to search.
     * @returns {Promise<ProviderResponse | null>} A promise that resolves to a ProviderResponse object if a match is found, or null otherwise.
     */
    async search(query: string): Promise<ProviderResponse | null> {
        const $ = await fetchData(this.url);
        let scrapData: ProviderResponse | null = null;

        $('h3').each((_idx, el) => {
            if (scrapData) return; // If we already found a match, exit the loop
            const title = $(el).text().trim();
            const url = $(el).find('a').attr('href') || '';
            if (title.toLowerCase().includes(query.toLowerCase())) {
                scrapData = { title, group: null, url };
            }
        });

        return scrapData;
    }
    // TODO: use the download link to navigate here
    /**
     * Retrieves information about a provider from a given URL.
     *
     * @param {string} url - The URL to fetch the provider information from.
     * @returns {Promise<ProviderInfoResponse>} A promise that resolves to the provider information.
     */
    async getInfo(url: string): Promise<ProviderInfoResponse> {
        const $ = await fetchData(url);
        const title = $('h2').first().text().trim();
        const image = $('img').first().attr('src') || '';
        const downloads: Link[] = [];

        $('h2').each((_idx, el) => {
            const downloadProvider = $(el).text().trim();
            if (downloadProvider === 'DDOWNLOAD' || downloadProvider === 'RAPIDGATOR') {
                $(el).nextUntil('h2', 'h3').each((_idx, linkEl) => { // Use nextUntil to get all h3 until the next h2
                    const url = $(linkEl).find('a').attr('href') || '';
                    if (!downloads.some(link => link.url === url)) { // Check if the url is not already in the downloads array
                        const name = $(linkEl).text().trim();
                        downloads.push({ name, url });
                    }
                });
            }
        });

        return {
            title,
            group: null,
            downloads,
            image,
            screenshots: [],
        };
    }
}


