 /* this array is required here. define operations and stubbed responses here: */
 const stubs = [
   {
      operation: 'loadCommodityVarietyData',
      response: require('../fixtures/summary_pricing_data.json'),
   },
 ];

 /**
 * this function requires `window` to be passed
 * example 1: cy.visit('/', { 
 *  onBeforeLoad: stubFetch
 * })
 * **/
export function stubFetch(win) {
  const { fetch } = win;
  cy.stub(win, 'fetch', (...args) => {
    console.log('Handling fetch stub', args);
    const [url, request] = args;
    const postBody = JSON.parse(request.body);
    let promise;
    if (url.indexOf('graphql') !== -1) {
      stubs.some(stub => {
        if (postBody.operationName === stub.operation) {
          console.log('STUBBING', stub.operation);
          promise = Promise.resolve({
            ok: true,
            text() {
              return Promise.resolve(JSON.stringify(stub.response));
            },
          });
          return true;
        }
        return false;
      });
    }
    if (promise) {
      return promise;
    }
    console.warn('Real Fetch Getting Called With Args', args);
    return fetch(...args);
  });
}