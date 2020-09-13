export default class Popup {
  constructor(container) {
    this._container = container;
  }

  open() {
    this._container.classList.remove('hidden');
  }

  close() {
    this._container.classList.add('hidden');
    this.__clear();
  }

  __clear() {
    this._container.innerHTML = '';
  }

  create(content) {
    this._container.appendChild(content.content.cloneNode(true));
  }
}
