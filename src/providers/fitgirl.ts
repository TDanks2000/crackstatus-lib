import { AxiosRequestConfig } from 'axios';
import { BaseProvider, Link, ProviderInfoResponse, ProviderResponse } from '../@types';
import { Fuzzy, parseSize } from '../utils';

/**
 * FitGirl class.
 *
 * @extends BaseProvider
 */
export class FitGirl extends BaseProvider {
  name: string = 'fitgirl';
  url: string = 'https://fitgirl-repacks.site';

  private headers: AxiosRequestConfig['headers'] = {
    Cookie: '__ddg1_=;__ddg2_=;',
    'User-Agent':
      'Mozilla/5.0 (Linux; U; Android 5.0.2; Nokia 1000 LTE Build/GRK39F) AppleWebKit/534.27 (KHTML, like Gecko)  Chrome/53.0.3457.238 Mobile Safari/602.6',
  };

  /**
   * Searches for a query within the provider's website.
   *
   * @param {string} query - The query to search for.
   * @returns {Promise<ProviderResponse | null>} A promise that resolves to the scraped data if found, or null otherwise.
   */
  async search(query: string): Promise<ProviderResponse[] | null> {
    const searchUrl = `${this.url}/?s=${encodeURIComponent(this.sanitizeString(query))}`;

    const $ = await this.loadHTML(searchUrl, {
      headers: this.headers,
    });

    const container = $('div#content.site-content');

    const titles: {
      title: string;
      url: string;
      id: string;
    }[] = [];
    container.find('article.post').each((i, el) => {
      const title = $(el).find('.entry-title').find('a').first().text().trim();
      const url = $(el).find('.entry-title').find('a').first().attr('href') || '';
      const id = url.split(this.url)[1].split('/')[1] || '';

      title &&
        titles.push({
          title,
          url,
          id,
        });
    });

    const result = await Fuzzy(
      titles.map(title => ({ title: title.title, url: title.url, id: title.id, group: this.name })),
      query,
    );

    return result;
  }
  /**
   * Retrieves information from a given URL.
   *
   * @param {string} id - The URL or ID to fetch data from.
   * @returns {Promise<ProviderInfoResponse>} The provider info response object.
   */
  async info(id: string): Promise<ProviderInfoResponse> {
    const url = id.startsWith(this.url) ? id : `${this.url}/${id}`;

    const $ = await this.loadHTML(url, {
      headers: this.headers,
    });

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
            const screenshotUrl = $(imgEl).find('img').attr('src') || '';
            if (screenshotUrl) {
              screenshots.push(screenshotUrl);
            }
          });
      }
    });

    const downloads: Link[] = [];

    const magnet = "a:contains('magnet')";
    const torrent = "a:contains('.torrent')";

    $(magnet).each((_idx, el) => {
      const url = $(el).attr('href') || '';
      const name = $(el).text().trim();
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

    let fileSize;
    let repackSize;
    const fileSizeSelector = "div p:contains('Original Size:')";
    $(fileSizeSelector)
      .first()
      .text()
      .split('\n')
      .forEach(line => {
        if (line.includes('Original Size:')) {
          fileSize = parseSize(line.replace('Original Size:', '').trim());
        } else if (line.includes('Repack Size:')) {
          repackSize = parseSize(line.replace('Repack Size:', ''));
        }
      });

    return {
      title,
      group: this.name,
      downloads,
      image,
      screenshots,
      fileSize,
      repackSize,
    };
  }
}

(async () => {
  const provider = new FitGirl();
  const result = await provider.search('batman arkham city');
  console.log(result);
})();
