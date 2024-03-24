"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSize = void 0;
__exportStar(require("./fuzzy"), exports);
__exportStar(require("./helpers"), exports);
/**
 * Parses a string containing a file size into a more readable format.
 *
 * @param {string} size - The size string to parse (e.g., '3.4 GB').
 * @returns {string} The parsed size string (e.g., '3.4 GB'). If the input string
 *                  does not match the expected format, an empty string is returned.
 */
const parseSize = (size) => {
    // Regular expression to match a number followed by a space and then a unit (e.g., GB, MB)
    const regex = /(\d+\.\d+|\d+)(\s*)([a-zA-Z]+)/;
    const match = size.match(regex);
    // If a match is found, return the number and unit, otherwise return an empty string
    return match ? `${match[1]}${match[2]}${match[3]}` : '';
};
exports.parseSize = parseSize;
