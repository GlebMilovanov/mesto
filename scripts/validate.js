const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/* functions */
/*show error when input is invalid */
function showInputError(errorElement, input, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

/* hide error when input is valid */
function hideInputError(errorElement, input, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

/* check for validity */
function isValid(form, input, config) {
  const errorElement = form.querySelector(`.${input.name}-error`);

  if (input.validity.valid) {
    hideInputError(errorElement, input, config);
  } else {
    showInputError(errorElement, input, config);
  }
}

/* check for validity to change button state */
function checkInputValidity(inputs) {
  return inputs.every((input) => input.validity.valid);
}

/* change button state */
function toggleButtonState(inputs, button, config) {
  if (checkInputValidity(inputs)) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute("disabled", "");
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute("disabled", "");
  }
}

/* check every input */
function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, button, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

/* form validation */
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

enableValidation(validationConfig);
