import { render } from '../framework/render.js';
import { getRandomArrayElement } from '../utils.js';
import AwardTopRatedView from '../view/award-top-rated-view.js';
import AwardMostCommentedView from '../view/award-most-commented-view';

export default class AwardedFilmsPresenter {
  #awardedFilmsContainer = null;
  #films = null;

  constructor({awardedFilmsContainer, films}) {
    this.#awardedFilmsContainer = awardedFilmsContainer;
    this.#films = films;
  }

  init() {
    if (!this.#isFilmsRatingZero()) {
      this.#renderTopRatedFilms();
    }
    if(!this.#isNoCommentedFilms()) {
      this.#renderMostCommentedFilms();
    }
  }

  #renderTopRatedFilms() {
    const filmsSortedByRating = [...this.#films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const topRatedFilms = this.#isFilmsSameRating() ? this.#getRandomFilmsToAward() : [filmsSortedByRating[0], filmsSortedByRating[1]];
    render(new AwardTopRatedView({topRatedFilms}), this.#awardedFilmsContainer);
  }

  #renderMostCommentedFilms() {
    const filmsSortedByComments = [...this.#films].sort((a, b) => b.comments.length - a.comments.length);
    const mostCommentedFilms = this.#isFilmsSameCommentsQuantity() ? this.#getRandomFilmsToAward() : [filmsSortedByComments[0], filmsSortedByComments[1]];
    render(new AwardMostCommentedView({mostCommentedFilms}), this.#awardedFilmsContainer);
  }

  #getRandomFilmsToAward() {
    const firstRandomFilm = getRandomArrayElement(this.#films);
    const secondRandomFilm = getRandomArrayElement(this.#films);
    return secondRandomFilm === firstRandomFilm ? this.#getRandomFilmsToAward() : [firstRandomFilm, secondRandomFilm];
  }

  #isFilmsSameRating(){
    return this.#films.every((film) => film.filmInfo.totalRating === this.#films[0].filmInfo.totalRating);
  }

  #isFilmsRatingZero() {
    return this.#films.every((film) => film.filmInfo.totalRating === 0);
  }

  #isFilmsSameCommentsQuantity() {
    return this.#films.every((film) => film.comments.length === this.#films[0].comments.length);
  }

  #isNoCommentedFilms() {
    return this.#films.every((film) => film.comments.length === 0);
  }
}
