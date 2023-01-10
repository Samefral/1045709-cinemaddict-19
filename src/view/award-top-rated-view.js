import AbstractView from '../framework/view/abstract-view.js';
import FilmCardView from './film-card-view.js';

const createTopRatedTemplate = (topRatedFilms) => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
        ${topRatedFilms.map((film) => `
          ${new FilmCardView({film}).template}
        `)}
      </div>
    </section>`
);

export default class AwardTopRatedView extends AbstractView {
  #topRatedFilms = null;

  constructor({topRatedFilms}) {
    super();
    this.#topRatedFilms = topRatedFilms;
  }

  get template() {
    return createTopRatedTemplate(this.#topRatedFilms);
  }

}
