import {createElement} from '../render.js';

const FILTERS = {
  all: 'There are no movies in our database',
  watchlist: 'There are no movies to watch now',
  history: 'There are no watched movies now',
  favorites: 'There are no favorite movies now'
};

const createEmptyFilmListTemplate = (activeFilter) => `<h2 class="films-list__title">${FILTERS[activeFilter]}</h2>`;

export default class EmptyFilmListView {
  #activeFilter = null;
  #element = null;

  constructor(activeFilter) {
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createEmptyFilmListTemplate(this.#activeFilter);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}