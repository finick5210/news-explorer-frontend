import Card from './Card';

import { removeClass, addClass } from '../utils/Utils';
import { NOT_FOUND_CODE } from '../constants/constants';

export default class CardList {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
  }

  _addCard(card, isSaved) {
    this._container.appendChild(card.create(false));
  }

  render(isSaved) {
    if (this._cards && this._cards.length !== 0) {
      this._cards.forEach((newsCard) => {
        const {
          title, description, source, url, urlToImage, publishedAt,
        } = newsCard;

        const card = new Card(
          null,
          description,
          urlToImage,
          title,
          publishedAt,
          url,
          source.name,
          null,
          () => {},
          () => {},
        );

        this._addCard(card, isSaved);
      });
    } else this.setErrorState(NOT_FOUND_CODE);

    if (!isSaved) {
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
