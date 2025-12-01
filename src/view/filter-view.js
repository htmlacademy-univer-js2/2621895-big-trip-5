import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export default class FilterView extends AbstractStatefulView {

  // Теперь фильтры ПРИНИМАЮТ ДАННЫЕ
  constructor(filters = []) {
    super();

    // Сохраняем фильтры в state
    this._state = {
      filters
    };
  }

  get template() {
    const { filters } = this._state;

    return `
      <form class="trip-filters" action="#" method="get">
        ${filters.map((filter) => `
          <div class="trip-filters__filter">
            <input
              id="filter-${filter.type}"
              class="trip-filters__filter-input visually-hidden"
              type="radio"
              name="trip-filter"
              value="${filter.type}"
              ${filter.isChecked ? 'checked' : ''}
              ${filter.isDisabled ? 'disabled' : ''}
            >
            <label class="trip-filters__filter-label" for="filter-${filter.type}">
              ${filter.title}
            </label>
          </div>
        `).join('')}
        <button class="visually-hidden" type="submit">
          Accept filter
        </button>
      </form>
    `;
  }

  // Пока обработчиков нет, но метод ОБЯЗАТЕЛЕН
  _restoreHandlers() {}
}
