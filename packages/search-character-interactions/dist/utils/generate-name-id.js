"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNameId = void 0;
function generateNameId(name) {
    return name.toLowerCase().split(" ").join("-");
}
exports.generateNameId = generateNameId;
//# sourceMappingURL=generate-name-id.js.map