"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBuilder = void 0;
class ErrorBuilder {
    constructor() {
        this.statusCode = 500;
        this.message = 'Something has gone wrong';
    }
    status(num) {
        this.statusCode = num;
        return this;
    }
    msg(str) {
        this.message = str;
        return this;
    }
}
exports.ErrorBuilder = ErrorBuilder;
