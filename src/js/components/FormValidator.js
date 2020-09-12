import {
  EMPTY_FIELD_ERROR_TEXT,
  INVALID_EMAIL_FORMAT,
  INVALID_PASSWORD_LENGTH,
  INVALID_NAME_LENGTH,
} from '../constants/constants';

export default class FormValidator {
  constructor(form) {
    this._form = form;
  }

  _getElements() {
    return this._form.elements;
  }

  _validateForm() {
    const elements = this._getElements();
    let isValid = true;
    elements.forEach((element) => {
      if (element.type !== 'submit') {
        isValid &= this.checkInputValidity(element, this._form.querySelector(`#error-${element.id}`));
      }
    }, 0);

    this._form.querySelector('.form__button').disabled = !isValid;
  }

  checkInputValidity(field, error) {
    const { length } = field.value;
    const fieldClassList = field.classList;

    if (field.checkValidity()) {
      error.innerHTML = '';
      return true;
    }
    if (length === 0) {
      error.innerHTML = EMPTY_FIELD_ERROR_TEXT;
    } else if (fieldClassList.contains('form__input_type_email')) {
      error.innerHTML = INVALID_EMAIL_FORMAT;
    } else if (fieldClassList.contains('form__input_type_password')) {
      error.innerHTML = INVALID_PASSWORD_LENGTH;
    } else {
      error.innerHTML = INVALID_NAME_LENGTH;
    }
    return false;
  }

  setEventListeners() {
    const elements = this._getElements();
    elements.forEach((element) => element.type !== 'submit'
      && element.addEventListener('input', () => this._validateForm()));
  }

  setError(error) {
    const serverErrorSpan = this._form.querySelector('.server-error');
    switch (error) {
      case 401: {
        serverErrorSpan.textContent = 'Неверные данные для входа';
        break;
      }
      case 404: {
        serverErrorSpan.textContent = 'Пользователь не найден';
        break;
      }
      case 409: {
        serverErrorSpan.textContent = 'Пользователь с таким email уже существует';
      }
      default: {
        serverErrorSpan.textContent = 'Ошибка сервера, обратитесь к системному администратору';
      }
    }
  }
}
