export class Response {

  static create() {
    return new Response();
  }

  constructor() {
    this.__is_response = true;
    this._headers = {};
    this._body = {};
    this._statusCode = 200;
  }

  statusCode(code) {
    this._statusCode = code;
    return this;
  }

  body(body) {
    this._body = body;
    return this;
  }

  setHeader(name, value) {
    this._headers[name] = value;
    return this;
  }

  build() {
    return {
      statusCode: this._statusCode,
      body: JSON.stringify(this._body),
      headers: this._headers
    }
  }
}
