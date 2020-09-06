export default class Header {
  constructor(container) {
    this._container = container;
  }

  _createBase(isAuthorized, name) {
    return document.createRange().createContextualFragment(
      isAuthorized ?
      `
        <p class="header__logo header__logo_theme_dark">NewsExplorer</p>
        <div class="header__container">
            <a class="header__link header__link_theme_dark header__link_underlined" title="Перейти на главную страницу" href="./index.html">Главная</a>
            <a class="header__link header__link_theme_dark header__link_saved" title="Перейти к сохраненным статьям" href="./articles.html">Сохраненные статьи</a>
            <button class="header__logout">${name}</button>
        </div>
    ` : `
     <p class="header__logo header__logo_theme_dark">NewsExplorer</p>
        <div class="header__container">
            <a class="header__link header__link_theme_dark header__link_underlined" title="Перейти на главную страницу" href="./index.html">Главная</a>
            <button class="header__authorization">Авторизоваться</button>
        </div>
    `);
  }

  _createSaved() {
    return document.createRange().createContextualFragment(
      `
      <p class="header__logo header__logo_theme_white">NewsExplorer</p>
      <div class="header__container">
        <a class="header__link header__link_theme_white" title="Перейти на главную страницу" href="./index.html">Главная</a>
        <a class="header__link header__link_underlined header__link_theme_white" title="Перейти к сохраненным статьям" href="./articles.html">Сохраненные статьи</a>
        <button class="header__logout header__logout_theme_white">Грета</button>
      </div>
    `);
  }

  render(parameters) {
    const { isAuthorized = false, isSaved = false, name = '' } = parameters;
    isSaved ? this._createSaved() : this._container.appendChild(this._createBase(isAuthorized, name));
  }
}