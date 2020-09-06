export default class Api {
  constructor(params) {
    const { baseUrl, headers } = params;

    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  signup(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password, name })
    })
      .then(res => this._getResponse(res));
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
      .then(res => this._getResponse(res));
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${this._getToken()}`
      },
      credentials: 'include',
    })
      .then(res => this._getResponse(res));
  }

  addArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${this._getToken()}`
      },
      credentials: 'include',
      body: JSON.stringify({ keyword, title, text, date, source, link, image})
    })
      .then(res => this._getResponse(res));
  }

  deleteArticle(id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${this._getToken()}`
      },
      credentials: 'include',
    })
      .then(res => this._getResponse(res));
  }

  getUser() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${this._getToken()}`
      }
    })
      .then(
        res => this._getResponse(res)
      );
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  _getToken() {
    const match = document.cookie.match(new RegExp('(^| )' + 'jwt' + '=([^;]+)'));
    return match ? match[2] : null;
  }
}