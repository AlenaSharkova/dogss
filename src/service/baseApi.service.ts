
export default class BaseApiService {
  protected _baseURL: string = '';
  protected _token = '';

  get baseURL() {
    return this._baseURL;
  }
  setAuthToken(token: string) {
    this._token = token;
  }
  protected defaultHeaders = {
    'Content-Type': 'application/json',
    accept: 'application/json',
  };
  protected multipartHeaders = {
    'Content-Type': 'multipart/form-data',
    accept: '/',
  };

  get authHeader() {
    if (!this._token) return null;
    return {
      Authorization: `Bearer ${this._token}`,
    };
  }

  get headers() {
    return {
      ...this.defaultHeaders,
      ...(!!this.authHeader && this.authHeader),
    };
  }
  get headersMultipart() {
    return {
      ...(!!this.authHeader && this.authHeader),
      ...this.multipartHeaders,
    };
  }
  constructor(baseUrl: string) {
    this._baseURL = '';
  }
}
