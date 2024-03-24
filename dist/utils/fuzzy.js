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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fuzzy = void 0;
// Import Fuse from fuse.js
const fuse_js_1 = __importDefault(require("fuse.js"));
const flags = {
    skip: ['uncracked', 'unlocked'],
};
// Adjust the options to match those expected by fuse.js
const defaultOptions = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.6, // Adjust the threshold as needed
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title'], // Specify the keys to search in
};
const clearRegex = /[^\w\s]/g;
const Fuzzy = (list_1, query_1, ...args_1) => __awaiter(void 0, [list_1, query_1, ...args_1], void 0, function* (list, query, options = defaultOptions) {
    const items = list
        .filter(({ title }) => !flags.skip.some(flag => title.includes(flag)))
        // remove weird letters
        .map(({ title, group, url, id }) => ({
        title: title.replace(clearRegex, ''),
        group,
        url,
        id,
    }));
    // Create a Fuse instance with the items and options
    const fuse = new fuse_js_1.default(items, options);
    // Perform the search
    const result = fuse.search(query.replace(clearRegex, ''));
    // Return the first result if any, otherwise null
    return result.length > 0 ? result[0].item : null;
});
exports.Fuzzy = Fuzzy;
