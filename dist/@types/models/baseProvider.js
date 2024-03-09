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
exports.BaseProvider = void 0;
const cheerio_1 = require("cheerio");
const proxy_1 = __importDefault(require("./proxy"));
/**
 * Represents an abstract base class for providers.
 * @abstract
 * @extends Proxy
 */
class BaseProvider extends proxy_1.default {
    loadHTML(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.get(url);
            return (0, cheerio_1.load)(result.data);
        });
    }
    sanitizeString(string) {
        return string.replace(/[^a-zA-Z0-9 ]/g, '');
    }
}
exports.BaseProvider = BaseProvider;
