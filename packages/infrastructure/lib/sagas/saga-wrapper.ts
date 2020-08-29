export function sagaWrapper(fn: any) {
  return (event) => {
    const promise = event.__promise;
    try {
      const result = fn(event);
      promise.resolve(result);
      return result;
    } catch (e) {
      promise.reject(e);
      throw e;
    }
  };
}
