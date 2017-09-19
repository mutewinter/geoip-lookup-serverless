import objectGet from 'lodash/get';

export class Request {
  constructor(event, context, callback) {
    this._event = event;
    this._context = context;
    this._callback = callback;
  }

  get event() {
    return this._event;
  }

  get context() {
    return this._context;
  }

  get callback() {
    return this._callback;
  }

  getJsonPayload() {
    return JSON.parse(this._event.body);
  }

  getHeader(name) {
    return objectGet(this._event, ['headers', name], null);
  }

  getSourceIp() {
    return objectGet(this._event, ['headers', 'CF-Connecting-IP'], null)
      || objectGet(this._event, ['requestContext', 'identity', 'sourceIp'], null);
  }

  getOrigin() {
    return objectGet(this._event, ['headers', 'Origin'], null)
      || objectGet(this._event, ['headers', 'origin'], null);
  }

  getStage() {
    return objectGet(this._event, ['requestContext', 'stage'], null);
  }
}
