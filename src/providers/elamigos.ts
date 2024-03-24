import { BaseProvider, ProviderInfoResponse, ProviderResponse } from '../@types';
import { Fuzzy } from '../utils';

/**
 * Class representing the Elamigos provider.
 * @extends BaseProvider
 */
// export class Elamigos extends BaseProvider {
//   name: string = 'elamigos';
//   url: string = 'https://www.elamigos-games.net/';

//   /**
//    * Searches for a matching item in the provided URL
//    * @param {string} query - The search query to be used
//    * @returns {Promise<ProviderResponse | null>} - A promise that resolves to the scraped data if a match is found, otherwise null
//    */
//   async search(query: string): Promise<ProviderResponse | null> {
//     // Update the URL to include the search query parameter
//     const searchUrl = `${this.url}?q=${encodeURIComponent(this.sanitizeString(query))}`;

//     console.log(this.sanitizeString(query));
//     const $ = await this.loadHTML(searchUrl);

//     const titles: string[] = [];

//     // Iterate through each portfolio-item to find the game titles and URLs
//     $('.portfolio-item').each((_idx, el) => {
//       const title = $(el).find('.card-body .card-title a').text().trim();
//       titles.push(title);
//     });

//     const result = await Fuzzy(
//       titles.map(title => ({ title, group: this.name })),
//       query,
//     );

//     return result;
//   }

//   /**
//    * Retrieves information about a provider from a given URL.
//    *
//    * @param {string} url - The URL of the provider's information page.
//    * @returns {Promise<ProviderInfoResponse>} - A promise that resolves to an object containing the provider's information.
//    */
//   async info(url: string): Promise<ProviderInfoResponse> {
//     const $ = await this.loadHTML(url);
//     const title = $('h2').first().text().trim();
//     const image = $('img').first().attr('src') || '';

//     const screenshots: string[] = [];

//     $('.row .col-md-3.col-sm-6.mb-4 a').each((_idx, el) => {
//       const screenshotUrl = $(el).attr('href') || '';
//       if (screenshotUrl) {
//         screenshots.push(screenshotUrl);
//       }
//     });

//     const downloads: Link[] = [];
//     $('#dw a').each((_idx, el) => {
//       const url = $(el).attr('href') || '';
//       const name = $(el).text().trim();
//       if (url) {
//         downloads.push({ name, url });
//       }
//     });

//     return {
//       title,
//       group: null,
//       downloads,
//       image,
//       screenshots,
//     };
//   }
// }

export class Elamigos extends BaseProvider {
  name: string = 'Elamigos';
  url: string = 'https://elamigos.site/';

  async search(query: string): Promise<ProviderResponse | null> {
    const $ = await this.loadHTML(this.url);

    const titles: { title: string; url: string }[] = [];
    const titleSelector = 'body > h3';

    $(titleSelector).each((_idx, el) => {
      const title = $(el)
        .text()
        .replace(/DOWNLOAD|ElAmigos/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      titles.push({
        title,
        url: `${this.url}/${$(el).find('a').attr('href')}` || '',
      });
    });

    const result = await Fuzzy(
      titles.map(({ title, url }) => ({ title, url, group: this.name })),
      query,
    );

    return result;
  }

  info(id: string, ...args: any[]): Promise<ProviderInfoResponse | null> {
    throw new Error('Method not implemented.');
  }
}
