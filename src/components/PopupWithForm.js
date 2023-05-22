import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  getInputValues() {
    this._formValues = this._inputs.reduce((obj, input) => {
      obj[input.name] = input.value;
      return obj;
    }, {});
    return this._formValues;
  }

  setInputValue(data) {
    this._inputs.forEach((input) => (input.value = data[input.name]));
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
