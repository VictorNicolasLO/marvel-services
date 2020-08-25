"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToBuffer = void 0;
function jsonToBuffer(object) {
    return Buffer.from(JSON.stringify(object));
}
exports.jsonToBuffer = jsonToBuffer;
//# sourceMappingURL=utils.js.map