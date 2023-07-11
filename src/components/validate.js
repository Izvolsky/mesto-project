export { enableValidation, setting };

const setting = {
  formElement: ".popup__form",
  inputElement: ".popup__input",
  buttonElement: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
};

//скрывает элемент ошибки
const hideInputError = (formElement, inputElement, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.errorClass);
  errorElement.textContent = "";
};

//проверяет валидность поля и  внутри вызывает функции showInputError или hideInputError
const checkInputValidity = (formElement, inputElement, setting) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      setting
    );
  } else {
    hideInputError(formElement, inputElement, setting);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, setting) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(setting.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(setting.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, setting) => {
  const inputList = Array.from(
    formElement.querySelectorAll(setting.inputElement)
  );
  const buttonElement = formElement.querySelector(setting.buttonElement);
  toggleButtonState(inputList, buttonElement, setting);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, setting);
      toggleButtonState(inputList, buttonElement, setting);
    });
  });
};
const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, setting);
  });
};
