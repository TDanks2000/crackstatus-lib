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
exports.GameStatus = void 0;
const axios_1 = __importDefault(require("axios"));
const urlcat_1 = __importDefault(require("urlcat"));
class GameStatus {
    constructor() {
        this.name = 'GameStatus';
        this.baseUrl = 'https://gamestatus.info/back/api/gameinfo/game/';
        /**
         * takes a title and converts it to a slug
         *
         * @param title The title of the game
         * @returns string
         * @example "Halo Infinite" -> "halo-infinite"
         */
        this.formatTitleToSlug = (title) => title.replace(/\s+/g, '-').toLowerCase();
    }
    checkStatus(title) {
        return __awaiter(this, void 0, void 0, function* () {
            //todo maybe there is better way, rn im using title -> slug convert
            const formattedTitle = this.formatTitleToSlug(title);
            //kinda like this urlcat lib, cleaner then ${} stuff
            const url = (0, urlcat_1.default)(this.baseUrl, ':title', { title: encodeURIComponent(formattedTitle) });
            try {
                // destruct data and rename it to game
                const { data: game } = yield axios_1.default.get(url);
                // Return the data as ProviderInfoResponse
                return {
                    title: game.title,
                    group: game.hacked_groups[0],
                    downloads: [],
                    image: game.full_image,
                    screenshots: [game.full_image],
                    releaseDate: game.release_date,
                    crackDate: game.crack_date,
                    readableStatus: game.readable_status,
                    specs: game.specs_info,
                };
            }
            catch (error) {
                throw new Error(`Failed to fetch game status ${error.message}`);
            }
        });
    }
}
exports.GameStatus = GameStatus;
