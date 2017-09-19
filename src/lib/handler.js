import { Request } from './request';

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function buildResponse(val, request) {
  if (val && val.__is_response) {
    const result = val.build();
    result.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE';
    result.headers['Access-Control-Allow-Origin'] = '*';

    // If you need to lock down CORS to specific domains, you can adda  test like this
    // instead of using * above
    // if (request.getOrigin() && request.getOrigin().match(/^https?:\/\/(\w*\.)?my-domain\.(com|net)/)) {
    //   result.headers['Access-Control-Allow-Origin'] = request.getOrigin();
    // }

    return result;
  }
  return val;
}

export function createHandler(handler) {
  return (event, context, callback) => {
    const request = new Request(event, context, callback);
    const result = handler(request);

    if (isPromise(result)) {
      result.then((res) => callback(null, buildResponse(res, request))).catch((res) => callback(buildResponse(res, request), null));
    } else {
      const response = buildResponse(result, request);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        callback(null, response);
      } else {
        callback(buildResponse(result, request), null);
      }
    }
  };
}
