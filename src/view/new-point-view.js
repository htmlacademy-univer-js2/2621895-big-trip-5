import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export default class NewPointView extends AbstractStatefulView {
  /**
   * @param {Array} destinations - список городов для datalist
   * @param {Array} options - список доступных опций
   */
  constructor(destinations = [], options = []) {
    super();
    this._state = {
      point: {
        type: '',
        destinationId: null,
        startDate: '',
        endDate: '',
        price: 0,
        optionIds: []
      },
      destinations,
      options
    };

    // При необходимости можно вызвать this._restoreHandlers() здесь,
    // но оставляем вызов вызывающему коду/рендереру (в данном проекте
    // _restoreHandlers вызывается в конструкторе у тех view, которым нужно)
  }

  get template() {
    const destination = this._state.destinations;
    const options = this._state.options;
    // В режиме создания поля пустые — но показываем список городов и офферов
    const cityOptions = destination.map((d) => `<option value="${d.cityName}"></option>`).join('');
    const optionsTemplate = options.map((opt) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
               id="event-offer-${opt.id}"
               type="checkbox"
               name="event-offer-${opt.type}">
        <label class="event__offer-label" for="event-offer-${opt.id}">
          <span class="event__offer-title">${opt.name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${opt.price}</span>
        </label>
      </div>
    `).join('');

    return `
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/bus.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              Bus
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
            <datalist id="destination-list-1">
              ${cityOptions}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${optionsTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description"></p>
          </section>
        </section>
      </form>
    `;
  }

  /**
   * Метод, который вызывается после updateElement()
   * Нужно восстановить обработчики событий.
   */
  _restoreHandlers() {
    // Здесь добавляй addEventListener(...) при необходимости.
  }
}
