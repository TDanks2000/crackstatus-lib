"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitGirl = void 0;
const _types_1 = require("../@types");
const utils_1 = require("../utils");
/**
 * FitGirl class.
 *
 * @extends BaseProvider
 */
class FitGirl extends _types_1.BaseProvider {
    constructor() {
        super(...arguments);
        this.name = 'fitgirl';
        this.url = 'https://fitgirl-repacks.site';
        this.headers = {
            Cookie: '__ddg1_=;__ddg2_=;',
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 5.0.2; Nokia 1000 LTE Build/GRK39F) AppleWebKit/534.27 (KHTML, like Gecko)  Chrome/53.0.3457.238 Mobile Safari/602.6',
        };
    }
    /**
     * Searches for a query within the provider's website.
     *
     * @param {string} query - The query to search for.
     * @returns {Promise<ProviderResponse | null>} A promise that resolves to the scraped data if found, or null otherwise.
     */
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchUrl = `${this.url}/?s=${encodeURIComponent(this.sanitizeString(query))}`;
            const $ = yield this.loadHTML(searchUrl, {
                headers: this.headers,
            });
            const container = $('div#content.site-content');
            const titles = [];
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
            const result = yield (0, utils_1.Fuzzy)(titles.map(title => ({ title: title.title, url: title.url, id: title.id, group: this.name })), query);
            return result;
        });
    }
    /**
     * Retrieves information from a given URL.
     *
     * @param {string} id - The URL or ID to fetch data from.
     * @returns {Promise<ProviderInfoResponse>} The provider info response object.
     */
    info(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = id.startsWith(this.url) ? id : `${this.url}/${id}`;
            const $ = yield this.loadHTML(url, {
                headers: this.headers,
            });
            const title = $('h1.entry-title').first().text().trim();
            const image = $('p a img.alignleft').first().attr('src') || '';
            const screenshots = [];
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
            const downloads = [];
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
                    fileSize = (0, utils_1.parseSize)(line.replace('Original Size:', '').trim());
                }
                else if (line.includes('Repack Size:')) {
                    repackSize = (0, utils_1.parseSize)(line.replace('Repack Size:', ''));
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
        });
    }
}
exports.FitGirl = FitGirl;
