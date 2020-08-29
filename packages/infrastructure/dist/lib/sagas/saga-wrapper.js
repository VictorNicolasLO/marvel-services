"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sagaWrapper = void 0;
function sagaWrapper(fn) {
    return (event) => {
        const promise = event.__promise;
        try {
            const result = fn(event);
            promise.resolve(result);
            return result;
        }
        catch (e) {
            promise.reject(e);
            throw e;
        }
    };
}
exports.sagaWrapper = sagaWrapper;
//# sourceMappingURL=saga-wrapper.js.map