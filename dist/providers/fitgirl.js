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
            const $ = yield this.loadHTML(searchUrl);
            const container = $('div#content.site-content');
            const titles = [];
            container.find('article.post').each((i, el) => {
                const title = $(el).find('.entry-title').find('a').first().text().trim();
                title && titles.push(title);
            });
            const result = yield (0, utils_1.Fuzzy)(titles.map(title => ({ title, group: this.name })), query);
            return result;
        });
    }
    /**
     * Retrieves information from a given URL.
     *
     * @param {string} url - The URL to fetch data from.
     * @returns {Promise<ProviderInfoResponse>} The provider info response object.
     */
    info(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.loadHTML(url);
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
                        const screenshotUrl = $(imgEl).attr('href') || '';
                        if (screenshotUrl) {
                            screenshots.push(screenshotUrl);
                        }
                    });
                }
            });
            const downloads = [];
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
                group: this.name,
                downloads,
                image,
                screenshots,
            };
        });
    }
}
exports.FitGirl = FitGirl;
