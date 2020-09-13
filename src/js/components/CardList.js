import Card from './Card';

import { removeClass, addClass } from '../utils/Utils';
import { NOT_FOUND_CODE, ROW_SIZE } from '../constants/constants';

export default class CardList {
  constructor(container, cards, saveCallback, removeCallback, limit) {
    this._container = container;
    this._cards = cards;
    this._saveCallback = saveCallback;
    this._removeCallback = removeCallback;
    this._limit = limit || ROW_SIZE;
  }

  _addCard(card, isSaved, isAuthorized) {
    this._container.appendChild(card.create(isSaved, isAuthorized));
  }

  _clear() {
    while (this._container.hasChildNodes()) {
      this._container.removeChild(this._container.lastChild);
    }
  }

  render(isSaved, isAuthorized) {
    this._isSaved = isSaved;
    this._isAuthorized = isAuthorized;

    if (this._cards && this._cards.length !== 0) {
      this._cards.forEach((newsCard, index) => {
        if (index < this._limit) {
          const {
            _id = null,
            text,
            image,
            date,
            title,
            description,
            source,
            url,
            urlToImage,
            publishedAt,
            link,
            keyword,
          } = newsCard;

          const card = new Card(
            _id,
            isSaved ? text : description,
            isSaved ? image : urlToImage,
            title,
            isSaved ? date : publishedAt,
            isSaved ? link : url,
            isSaved ? source : source.name,
            isSaved ? keyword : document.forms.search.keyword.value,
            this._saveCallback,
            this._removeCallback,
          );

          this._addCard(card, isSaved, isAuthorized);
        }
      });
    } else this.setErrorState(NOT_FOUND_CODE);

    if (!isSaved) {
      const moreResultsButton = document.querySelector('.search-results__more');

      removeClass(moreResultsButton, 'hidden');

      moreResultsButton.addEventListener('click', () => {
        this._showMoreCards();
      });
    }
  }

  setLoading(value) {
    const loader = document.querySelector('.loading');
    value ? addClass(loader, 'hidden') : removeClass(loader, 'hidden');
  }

  _showMoreCards() {
    this._clear();

    this.setLoading(true);
    this._limit += ROW_SIZE;
    this.render(this._isSaved, this._isAuthorized);
    this._limit >= 100 && addClass(document.querySelector('.search-results__more'), 'hidden');
  }

  setErrorState(code) {
    addClass(document.querySelector('.search-results'), 'hidden');
    removeClass(document.querySelector('.not-found'), 'hidden');

    const isNotFound = code === NOT_FOUND_CODE;

    document.querySelector('.not-found__title').textContent = isNotFound ? 'Ничего не найдено' : 'Во время запроса произошла ошибка';
    document.querySelector('.not-found__text').textContent = isNotFound ? 'К сожалению, по вашему запросу ничего не найдено' : 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
  }
}
