import { BaseProvider, Link, ProviderInfoResponse, ProviderResponse } from '../@types';

/**
 * Class representing the Elamigos provider.
 * @extends BaseProvider
 */
export class Elamigos extends BaseProvider {
  name: string = 'elamigos';
  url: string = 'https://www.elamigos-games.net/';

  /**
   * Searches for a matching item in the provided URL
   * @param {string} query - The search query to be used
   * @returns {Promise<ProviderResponse | null>} - A promise that resolves to the scraped data if a match is found, otherwise null
   */
  async search(query: string): Promise<ProviderResponse | null> {
    // Update the URL to include the search query parameter
    const searchUrl = `${this.url}?q=${encodeURIComponent(query)}`;
    const $ = await this.loadHTML(searchUrl);

    let scrapData: ProviderResponse | null = null;

    // Iterate through each portfolio-item to find the game titles and URLs
    $('.portfolio-item').each((_idx, el) => {
      if (scrapData) return; // If we already found a match, exit the loop
      const title = $(el).find('.card-body .card-title a').text().trim();
      const url = $(el).find('.card-body .card-title a').attr('href') || '';
      if (title.toLowerCase().includes(query.toLowerCase())) {
        scrapData = { title, group: null, url };
        return false; // Exit the loop after finding the first match
      }
    });

    return scrapData;
  }

  /**
   * Retrieves information about a provider from a given URL.
   *
   * @param {string} url - The URL of the provider's information page.
   * @returns {Promise<ProviderInfoResponse>} - A promise that resolves to an object containing the provider's information.
   */
  async info(url: string): Promise<ProviderInfoResponse> {
    const $ = await this.loadHTML(url);
    const title = $('h2').first().text().trim();
    const image = $('img').first().attr('src') || '';

    const screenshots: string[] = [];

    $('.row .col-md-3.col-sm-6.mb-4 a').each((_idx, el) => {
      const screenshotUrl = $(el).attr('href') || '';
      if (screenshotUrl) {
        screenshots.push(screenshotUrl);
      }
    });

    const downloads: Link[] = [];
    $('#dw a').each((_idx, el) => {
      const url = $(el).attr('href') || '';
      const name = $(el).text().trim();
      if (url) {
        downloads.push({ name, url });
      }
    });

    return {
      title,
      group: null,
      downloads,
      image,
      screenshots,
    };
  }
}
