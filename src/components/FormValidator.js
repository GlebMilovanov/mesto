class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._config = config;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners(this._form, this._config);
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', '');
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled', '');
  }

  _toggleButtonState() {
    this._checkInputValidity(this._inputs)
      ? this._enableButton()
      : this._disableButton();
  }

  _checkInputValidity() {
    return this._inputs.every((input) => input.validity.valid);
  }

  _isValid(input) {
    const errorElement = this._form.querySelector(`.${input.name}-error`);

    input.validity.valid
      ? this._hideInputError(errorElement, input)
      : this._showInputError(errorElement, input);
  }

  _showInputError(errorElement, input) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(errorElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  resetErrorMessage() {
    this._inputs.forEach((input) => {
      const errorElement = this._form.querySelector(`.${input.name}-error`);

      if (!input.validity.valid) {
        this._hideInputError(errorElement, input, this._config);
        this._toggleButtonState();
      }
    });
  }
}

export default FormValidator;
