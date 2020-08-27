"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractIdFromUrl(url) {
    const fragments = url.split("/");
    return fragments[fragments.length - 1];
}
exports.extractIdFromUrl = extractIdFromUrl;
//# sourceMappingURL=extract-id-from-url.js.map