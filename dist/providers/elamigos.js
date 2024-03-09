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
exports.Elamigos = void 0;
const _types_1 = require("../@types");
/**
 * Class representing the Elamigos provider.
 * @extends BaseProvider
 */
class Elamigos extends _types_1.BaseProvider {
    constructor() {
        super(...arguments);
        this.name = 'elamigos';
        this.url = 'https://www.elamigos-games.net/';
    }
    /**
     * Searches for a matching item in the provided URL
     * @param {string} query - The search query to be used
     * @returns {Promise<ProviderResponse | null>} - A promise that resolves to the scraped data if a match is found, otherwise null
     */
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update the URL to include the search query parameter
            const searchUrl = `${this.url}?q=${encodeURIComponent(query)}`;
            const $ = yield this.loadHTML(searchUrl);
            let scrapData = null;
            // Iterate through each portfolio-item to find the game titles and URLs
            $('.portfolio-item').each((_idx, el) => {
                if (scrapData)
                    return; // If we already found a match, exit the loop
                const title = $(el).find('.card-body .card-title a').text().trim();
                const url = $(el).find('.card-body .card-title a').attr('href') || '';
                if (title.toLowerCase().includes(query.toLowerCase())) {
                    scrapData = { title, group: null, url };
                    return false; // Exit the loop after finding the first match
                }
            });
            return scrapData;
        });
    }
    /**
     * Retrieves information about a provider from a given URL.
     *
     * @param {string} url - The URL of the provider's information page.
     * @returns {Promise<ProviderInfoResponse>} - A promise that resolves to an object containing the provider's information.
     */
    info(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.loadHTML(url);
            const title = $('h2').first().text().trim();
            const image = $('img').first().attr('src') || '';
            const screenshots = [];
            $('.row .col-md-3.col-sm-6.mb-4 a').each((_idx, el) => {
                const screenshotUrl = $(el).attr('href') || '';
                if (screenshotUrl) {
                    screenshots.push(screenshotUrl);
                }
            });
            const downloads = [];
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
        });
    }
}
exports.Elamigos = Elamigos;
