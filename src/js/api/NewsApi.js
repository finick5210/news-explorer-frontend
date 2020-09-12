import { getResponse } from '../utils/Utils';

export default class NewsApi {
  constructor(params) {
    const { baseUrl, key } = params;

    this._baseUrl = baseUrl;
    this._key = key;
  }

  getNews(params) {
    const {
      q, from, to, pageSize,
    } = params;
    return fetch(`${this._baseUrl}/v2/everything?q=${q}&from=${from}&to=${to}&pageSize=${pageSize}&apiKey=${this._key}`, {})
      .then((res) => getResponse(res));
  }
}
