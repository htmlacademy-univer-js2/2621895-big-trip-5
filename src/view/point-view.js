import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export default class PointView extends AbstractStatefulView {
  /**
   * @param {Object} point - данные точки маршрута
   * @param {Array} destinations
   * @param {Array} options
   * @param {Object} handlers - { onRollupClick }
   */
  constructor(point, destinations = [], options = [], { onRollupClick } = {}) {
    super();

    this._state = {
      point,
      destinations,
      options
    };

    // внешний обработчик, передаётся из Presenter
    this._onRollupClick = onRollupClick;

    // (не вызываем _restoreHandlers() здесь намеренно — вызов в конструкторе
    // нужен только если хотим сразу навесить обработчики; в данном паттерне
    // рендер вызывает геттер element и мы можем навесить обработчики в _restoreHandlers)
    this._restoreHandlers();
  }

  get template() {
    const point = this._state.point || {};
    const destinations = this._state.destinations || [];
    const options = this._state.options || [];

    // поддерживаем оба варианта названия полей (destinationId или destination)
    const destinationId = point.destinationId ?? point.destination;
    const destination = destinations.find((d) => d.id === destinationId) || {
      cityName: '', description: '', photos: []
    };

    // поддерживаем оба варианта дат
    const start = point.startDate ?? point.dateFrom ?? '';
    const end = point.endDate ?? point.dateTo ?? '';

    const pointOptions = Array.isArray(options) && Array.isArray(point.optionIds)
      ? options.filter((o) => point.optionIds.includes(o.id))
      : [];

    const type = point.type ?? '';
    const price = point.price ?? 0;

    // формат времени/даты — простой (можно улучшить позже)
    const startDateText = start ? start.split('T')[0] : '';
    const startTimeText = start ? (start.split('T')[1] || '') : '';
    const endTimeText = end ? (end.split('T')[1] || '') : '';

    return `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${start}">${startDateText}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${destination.cityName}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${start}">${startTimeText}</time>
              &mdash;
              <time class="event__end-time" datetime="${end}">${endTimeText}</time>
            </p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${pointOptions.map((opt) => `
              <li class="event__offer">
                <span class="event__offer-title">${opt.name}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${opt.price}</span>
              </li>
            `).join('')}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    `;
  }

  /**
   * В stateful view обработчики восстанавливаются здесь
   * (вызывается после updateElement()) fdfddf
   */
  _restoreHandlers() {
    const rollupButton = this.element.querySelector('.event__rollup-btn');
    if (rollupButton) {
      rollupButton.addEventListener('click', this._onRollupClick);
    }
  }
}
