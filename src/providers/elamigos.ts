import axios from 'axios';
import * as cheerio from 'cheerio';
import {BaseProvider, ProviderResponse} from "../@types";

 /**
  * Fetches data from the specified url and returns cheerio object.
  *
  * @param {string} url - The url to fetch the data from.
  * @return {Promise<cheerio.CheerioAPI>} - The cheerio object loaded with the fetched data.
  */
 async function fetchData(url: string) {
    const result = await axios.get(url);
    return cheerio.load(result.data);
}

/**
 * Class representing the Elamigos provider.
 * @extends BaseProvider
 */
export class Elamigos extends BaseProvider {
    name: string = 'elamigos';
    url: string = 'https://www.elamigos.site/';

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
}


