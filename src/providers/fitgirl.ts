import { BaseProvider, Link, ProviderInfoResponse, ProviderResponse } from '../@types';

/**
 * FitGirl class.
 *
 * @extends BaseProvider
 */
export class FitGirl extends BaseProvider {
  name: string = 'fitgirl';
  url: string = 'https://fitgirl-repacks.site';

  /**
   * Searches for a query within the provider's website.
   *
   * @param {string} query - The query to search for.
   * @returns {Promise<ProviderResponse | null>} A promise that resolves to the scraped data if found, or null otherwise.
   */
  async search(query: string): Promise<ProviderResponse | null> {
    const searchUrl = `${this.url}/?s=${encodeURIComponent(query)}`;
    const $ = await this.loadHTML(searchUrl);
    let scrapData: ProviderResponse | null = null;

    const entryTitle = $('h1.entry-title a').first();
    if (entryTitle.length) {
      const title = entryTitle.text().trim();
      const url = entryTitle.attr('href') || '';
      scrapData = { title, group: null, url };
    }

    return scrapData;
  }
  /**
   * Retrieves information from a given URL.
   *
   * @param {string} url - The URL to fetch data from.
   * @returns {Promise<ProviderInfoResponse>} The provider info response object.
   */
  async info(url: string): Promise<ProviderInfoResponse> {
    const $ = await this.loadHTML(url);
    const title = $('h1.entry-title').first().text().trim();
    const image = $('p a img.alignleft').first().attr('src') || '';
    const screenshots: string[] = [];
    // Extract screenshots
    $('h3').each((_idx, el) => {
      if ($(el).text().trim() === 'Screenshots (Click to enlarge)') {
        $(el)
          .next('p')
          .find('a')
          .each((_idx, imgEl) => {
            const screenshotUrl = $(imgEl).attr('href') || '';
            if (screenshotUrl) {
              screenshots.push(screenshotUrl);
            }
          });
      }
    });
    const downloads: Link[] = [];
    $('h3').each((_idx, el) => {
      if ($(el).text().trim() === 'Download Mirrors') {
        $(el)
          .next('ul')
          .find('li')
          .each((_idx, liEl) => {
            const linkEl = $(liEl).find('a').first();
            const name = linkEl.text().trim();
            const url = linkEl.attr('href') || '';
            if (url) {
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
      screenshots,
    };
  }
}
