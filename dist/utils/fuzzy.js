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
// TODO: Redo sort and remove fuzzysort for other fuzzy sorting package
const fuzzysort_1 = __importDefault(require("fuzzysort"));
const flags = {
    skip: ['uncracked', 'unlocked'],
};
// play around with these settings
const defaultOptions = {
    allowTypo: false,
    limit: 1,
    threshold: -12,
};
const clearRegex = /[^\w\s]/g;
const Fuzzy = (list_1, query_1, ...args_1) => __awaiter(void 0, [list_1, query_1, ...args_1], void 0, function* (list, query, options = defaultOptions) {
    const items = list
        .filter(({ title }) => !flags.skip.some(flag => title.includes(flag)))
        // remove weird letters
        .map(({ title, group }) => ({
        title: title.replace(clearRegex, ''),
        group,
    }));
    const result = fuzzysort_1.default.go(query.replace(clearRegex, ''), items, Object.assign(Object.assign(Object.assign({}, defaultOptions), options), { key: 'title' }));
    return result.length > 0 ? result[0].obj : null;
});
exports.Fuzzy = Fuzzy;
