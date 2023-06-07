class Card {
  constructor(
    data,
    selector,
    openImagePopup,
    openDeletePopup,
    handleLikeCard,
    myId
  ) {
    this._data = data;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._cardId = data._id;
    this._link = data.link;
    this._alt = data.name;
    this._name = data.name;
    this._likeList = data.likes;
    this._selector = selector;
    this._openImagePopup = openImagePopup;
    this._openDeletePopup = openDeletePopup;
    this._handleLikeCard = handleLikeCard;
    this._card = document
      .querySelector(this._selector)
      .content.cloneNode(true)
      .querySelector('.element');
    this._likeCounter = this._card.querySelector('.element__like-counter');
    this._likeCardButton = this._card.querySelector('.element__like-btn');
    this._deleteCardButton = this._card.querySelector('.element__delete-btn');
    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
  }

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _deleteMyCard() {
    this._myId === this._ownerId
      ? (this._deleteCardButton.style.display = 'block')
      : (this._deleteCardButton.style.display = 'none');
  }

  isLiked() {
    return this._likeList.some((element) => element._id === this._myId);
  }

  updateLikeCounter(likeList) {
    this._likeList = likeList;
    this._likeCounter.textContent = likeList.length;
  }

  toggleLikeButton() {
    this._likeCardButton.classList.toggle('element__like-btn_active');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () =>
      this._openImagePopup(this._data)
    );
    this._likeCardButton.addEventListener('click', () =>
      this._handleLikeCard(this)
    );
    this._deleteCardButton.addEventListener('click', () =>
      this._openDeletePopup(this)
    );
  }

  generate() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this.updateLikeCounter(this._data.likes);
    if (this.isLiked())
      this._likeCardButton.classList.add('element__like-btn_active');
    this._setEventListeners();
    this._deleteMyCard();

    return this._card;
  }
}

export default Card;
