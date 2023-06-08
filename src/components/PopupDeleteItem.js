import Popup from './Popup';

export default class PopupDeleteItem extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector('.popup__submit-btn');
    this._defaultSubmitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`;
      this._handleFormSubmit(this._element);
    });
  }

  setDefaultSubmitButtonText() {
    this._submitButton.textContent = this._defaultSubmitButtonText;
  }

  open = (element) => {
    super.open();
    this._element = element;
  };
}
