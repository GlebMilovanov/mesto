import { data } from 'jquery';

class Card {
  constructor(data, selector, openImagePopup) {
    this._data = data;
    this._link = data.link;
    this._alt = data.name;
    this._name = data.name;
    this._selector = selector;
    this._openImagePopup = openImagePopup;
    this._card = document
      .querySelector(this._selector)
      .content.cloneNode(true)
      .querySelector('.element');
    this._likeCardButton = this._card.querySelector('.element__like-btn');
    this._deleteCardButton = this._card.querySelector('.element__delete-btn');
    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
  }

  _likeCard() {
    this._likeCardButton.classList.toggle('element__like-btn_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () =>
      this._openImagePopup(this._data)
    );
    this._likeCardButton.addEventListener('click', () => this._likeCard());
    this._deleteCardButton.addEventListener('click', () => this._deleteCard());
  }

  generate() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}

export default Card;
