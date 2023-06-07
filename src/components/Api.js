export default class Api {
  constructor(url, groupId, token) {
    this._url = url;
    this._groupId = groupId;
    this._headers = {
      authorization: token,
      'Content-Type': 'application/json',
    };
  }

  /* check if response is ok */
  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  /* request user and cards info */
  getAppInfo() {
    return Promise.all([this.getCardsInfo(), this.getUserInfo()]);
  }

  /* get user info  from server */
  getUserInfo() {
    return fetch(`${this._url}${this._groupId}users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  /* get cards info  from server */
  getCardsInfo() {
    return fetch(`${this._url}${this._groupId}cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  /* send user info to server */
  sendUserInfo({ name, about }) {
    return fetch(`${this._url}${this._groupId}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData);
  }

  /* create new card */
  createCard({name, link}) {
    return fetch(`${this._url}${this._groupId}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponseData);
  }

  /* delete your card */
  deleteCard(cardId) {
    return fetch(`${this._url}${this._groupId}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  /* like card */
  likeCard(cardId) {
    return fetch(`${this._url}${this._groupId}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  /* remove like */
  removeCardLike(cardId) {
    return fetch(`${this._url}${this._groupId}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  /* update user photo */
  updateUserAvatar({ avatar }) {
    return fetch(`${this._url}${this._groupId}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData);
  }
}
