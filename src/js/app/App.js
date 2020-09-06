import Header from '../components/Header'
import Popup from '../components/Popup';
import Form from '../components/Form'

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
      .then((data) => {
        const { name, email } = data;

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
      } else if (classList.contains('popup__link_login')) {
        popup.close();
        popup.create(this._root.querySelector('#popup-signin'));
        popup.open();
      } else if (classList.contains('form__button_register')) {
        e.preventDefault();
        const registerForm = new Form(this._root.querySelector('.popup__form_register'));
        this._api.signup(registerForm.getValues())
          .then(() => {
            popup.close();
            popup.create(this._root.querySelector('#popup-enter'));
            popup.open();
          })
          .catch();
      } else if (classList.contains('form__button_login')) {
        e.preventDefault();
      }
    });
  }
}