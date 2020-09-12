import Card from './Card';

import { removeClass, addClass } from '../utils/Utils';
import { NOT_FOUND_CODE } from '../constants/constants';

export default class CardList {
  constructor(container, cards, saveCallback, removeCallback) {
    this._container = container;
    this._cards = cards;
    this._saveCallback = saveCallback;
    this._removeCallback = removeCallback;
  }

  _addCard(card, isSaved, isAuthorized) {
    this._container.appendChild(card.create(isSaved, isAuthorized));
  }

  render(isSaved, isAuthorized) {
    if (this._cards && this._cards.length !== 0) {
      this._cards.forEach((newsCard) => {
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
          keyword
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
          this._removeCallback
        );

        this._addCard(card, isSaved, isAuthorized);
      });
    } else this.setErrorState(NOT_FOUND_CODE);

    if (!isAuthorized) {
      const moreResultsButton = document.querySelector('.results__more');

      removeClass(moreResultsButton, 'hidden');

      moreResultsButton.addEventListener('click', () => {
        this.setLoading(true);
      });
    }
  }

  setLoading(value) {
    const loader = document.querySelector('.loading');
    value ? addClass(loader, 'hidden') : removeClass(loader, 'hidden');
  }

  setErrorState(code) {
    addClass(this._container.querySelector('.search-results'), 'hidden');
    removeClass(this._container.querySelector('.not-found'), 'hidden');

    const isNotFound = code === NOT_FOUND_CODE;

    this._container.querySelector('.not-found__title').textContent = isNotFound ? 'Ничего не найдено' : 'Во время запроса произошла ошибка';
    this._container.querySelector('.not-found__text').textContent = isNotFound ? 'К сожалению, по вашему запросу ничего не найдено' : 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
  }
}
