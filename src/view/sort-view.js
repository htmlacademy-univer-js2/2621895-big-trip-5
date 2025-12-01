import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export default class SortView extends AbstractStatefulView {

  // Сортировка ТЕПЕРЬ ТОЖЕ ПРИНИМАЕТ ДАННЫЕ
  constructor(sorts = []) {
    super();

    this._state = {
      sorts
    };
  }

  get template() {
    const { sorts } = this._state;

    return `
      <form class="trip-events__trip-sort trip-sort" action="#" method="get">
        ${sorts.map((sort) => `
          <div class="trip-sort__item trip-sort__item--${sort.type}">
            <input
              id="sort-${sort.type}"
              class="trip-sort__input visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${sort.type}"
              ${sort.isChecked ? 'checked' : ''}
              ${sort.isDisabled ? 'disabled' : ''}
            >
            <label class="trip-sort__btn" for="sort-${sort.type}">
              ${sort.title}
            </label>
          </div>
        `).join('')}
      </form>
    `;
  }

  // Пока без логики, но метод нужен
  _restoreHandlers() {}
}
