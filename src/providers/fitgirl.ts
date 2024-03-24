import { BaseProvider, Link, ProviderInfoResponse, ProviderResponse } from '../@types';
import { Fuzzy } from '../utils';

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
    const searchUrl = `${this.url}/?s=${encodeURIComponent(this.sanitizeString(query))}`;

    const $ = await this.loadHTML(searchUrl);

    const container = $('div#content.site-content');

    const titles: string[] = [];
    container.find('article.post').each((i, el) => {
      const title = $(el).find('.entry-title').find('a').first().text().trim();

      title && titles.push(title);
    });

    const result = await Fuzzy(
      titles.map(title => ({ title, group: this.name })),
      query,
    );

    return result;
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

    const magnet = "ul li a:contains('magnet')";
    const torrent = "ul li a:contains('.torrent')";

    $(magnet).each((_idx, el) => {
      const url = $(el).attr('href') || '';
      const name = $(el).text().trim();
      console.log($(el).text());
      if (url) {
        downloads.push({ name, url });
      }
    });

    $(torrent).each((_idx, el) => {
      const url = $(el).attr('href') || '';
      const name = $(el).text().trim();
      if (url) {
        downloads.push({ name, url });
      }
    });

    return {
      title,
      group: this.name,
      downloads,
      image,
      screenshots,
    };
  }
}
