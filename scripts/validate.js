const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.name}-error`);

  input.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

function isValid(form, input) {
  if (input.validity.valid) {
    hideInputError(form, input);
  } else {
    showInputError(form, input, input.validationMessage);
  }
}

function setEventListeners(form) {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input);
    });
  });
}

function enableValidation() {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => setEventListeners(form));
}

enableValidation(validationConfig);
