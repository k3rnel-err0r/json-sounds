"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesConverter = void 0;
/**
 * Returns the the size in Mega bytes
 * @param sizeInBites
 * @returns
 */
function bytesConverter(sizeInBites) {
    return sizeInBites / (1024 * 1024);
}
exports.bytesConverter = bytesConverter;
