import { addClass, addTextContent } from "../utils/Utils";

export default class Card {
  constructor(id = null, text, image, title, date, link, source, keyword, saveCallback, removeCallback) {
    this._id = id;
    this._text = text;
    this._image = image;
    this._title = title;
    this._date = date;
    this._link = link;
    this._source = source;
    this._keyword = keyword;
    this._saveCallback = saveCallback;
    this._removeCallback = removeCallback;
  }

  _createMarkup(isSaved) {
    return document.createRange().createContextualFragment(
      isSaved
        ? `
    <div class="card">
      <img class="card__image" alt="Иллюстрация статьи" src="${this._image}">
      <div class="card__tools">
        <div class="card__keyword">${this._keyword}</div>
        <div class="card__trash">
          <p class="card__suggest">Убрать из сохраненных</p>
        </div>
      </div>
      <div class="card__info">
        <p class="card__date">${this._date}</p>
        <h3 class="card__title">${this._title}</h3>
        <p class="card__text">${this._text}</p>
      </div>
      <p class="card__source">${this._source}</p>
    </div>`
        : `
    <div class="card">
      <img class="card__image" alt="Иллюстрация статьи" src="${this._image}"/>
      <div class="card__tools">
        <div class="card__bookmark"></div>
      </div>
      <div class="card__info">
        <p class="card__date">${this._date}</p>
        <h3 class="card__title">${this._title}</h3>
        <p class="card__text">${this._text}</p>
      </div>
      <p class="card__source">${this._source}</p>
    </div>`,
    );
  }

  create(isSaved, isAuthorized) {
    const card = this._createMarkup(isSaved);

    card.querySelector('.card').addEventListener('click', (e) => !e.target.classList.contains('card__bookmark') && window.open(this._link, '_blank'));

    if (isSaved) {
      card.querySelector('.card__suggest') && card.removeChild(card.querySelector('.card__suggest'));

      card.querySelector('.card__trash').addEventListener('click', (e) => {
        this._removeCallback(this._id)
          .then(() => {

          })
          .catch(() => {

          });
      });
    } else {
      const suggest = document.createElement('div');
      addClass(suggest, 'card__suggest');
      addTextContent(suggest, 'Войдите, чтобы сохранять статьи');
      card.querySelector('.card__bookmark').appendChild(suggest);
    }

    return card;
  }
}
