export default class Form {
  constructor(container) {
    this._container = container;
  }

  getValues() {
    return this._container ? {
      email: this._container.querySelector('.form__input_type_email').value,
      password: this._container.querySelector('.form__input_type_password').value,
      name: this._container.querySelector('.form__input_type_name').value
    }: {}
  }
}