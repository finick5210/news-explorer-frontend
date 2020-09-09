import Header from '../components/Header'
import Popup from '../components/Popup';
import Form from '../components/Form'
import FormValidator from "../components/FormValidator";

export default class App {
  constructor(root, api, newsApi) {
    this._root = root;
    this._api = api;
    this._newsApi = newsApi;
    this._parameters = {};
  }

  renderPage() {
    if (!this._api) {
      console.log('Rest service is undefined');
      return;
    }

    const headerContainer = this._root.querySelector('.header');
    const popupContainer = this._root.querySelector('.popup');

    const header = new Header(headerContainer);
    const popup = new Popup(popupContainer);

    this._api.getUser()
      .then((response) => {
        const { name, email } = response.data;

        this._parameters = {
          isAuthorized: true,
          name,
          email
        }
      })
      .catch(() => {
        this._parameters = {}
      })
      .finally(() => {
        header.render(this._parameters)
      });

    headerContainer.addEventListener('click', (e) => {
      const classList = e.target.classList;

      if (classList.contains('header__authorization')) {
        popup.create(this._root.querySelector('#popup-signin'));
        popup.open();
        const loginFormValidator = new FormValidator(this._root.querySelector('.popup__form_login'));
        loginFormValidator.setEventListeners();
      }
    });

    popupContainer.addEventListener('click', (e) => {
      const classList = e.target.classList;

      if (classList.contains('popup__close')) {
        popup.close();
      } else if (classList.contains('popup__link_register')) {
        popup.close();
        popup.create(this._root.querySelector('#popup-signup'));
        popup.open();
        const registerFormValidator = new FormValidator(this._root.querySelector('.popup__form_register'));
        registerFormValidator.setEventListeners();
      } else if (classList.contains('popup__link_login')) {
        popup.close();
        popup.create(this._root.querySelector('#popup-signin'));
        popup.open();
        const loginFormValidator = new FormValidator(this._root.querySelector('.popup__form_login'));
        loginFormValidator.setEventListeners();
      } else if (classList.contains('form__button_register')) {
        e.preventDefault();
        const registerForm = new Form(this._root.querySelector('.popup__form_register'));
        const registerFormValidator = new FormValidator(this._root.querySelector('.popup__form_register'));

        this._api.signup(
          registerForm.getEmail(),
          registerForm.getPassword(),
          registerForm.getName())
          .then(() => {
            popup.close();
            popup.create(this._root.querySelector('#popup-enter'));
            popup.open();
          })
          .catch((error) => registerFormValidator.setError(error));
      } else if (classList.contains('form__button_login')) {
        e.preventDefault();
        const loginForm = new Form(this._root.querySelector('.popup__form_login'));
        const loginFormValidator = new FormValidator(this._root.querySelector('.popup__form_login'));

        this._api.signin(
          loginForm.getEmail(),
          loginForm.getPassword()
        )
          .then(() => {
            popup.close();
            this._api.getUser()
              .then((response) => {
                const { name, email } = response.data;

                this._parameters = {
                  isAuthorized: true,
                  name,
                  email
                }
              })
              .catch(() => {
                this._parameters = {}
              })
              .finally(() => {
                header.render(this._parameters)
              });
          })
          .catch((error) => loginFormValidator.setError(error));
      }
    });
  }
}