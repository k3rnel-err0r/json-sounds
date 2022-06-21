"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaiter = void 0;
/**
 * Await the supplied time
 * @param waitTime
 * @returns
 */
function awaiter(waitTime) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, waitTime);
    });
}
exports.awaiter = awaiter;
