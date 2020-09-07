export default class Form {
  constructor(container) {
    this._container = container;
  }

  getEmail() {
    return this._container.querySelector('.form__input_type_email').value;
  }

  getPassword() {
    return this._container.querySelector('.form__input_type_password').value;
  }

  getName() {
    return this._container.querySelector('.form__input_type_name').value;
  }
}