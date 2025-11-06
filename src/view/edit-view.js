import { createElement } from '../render.js';

export default class EditView {
  /**
   * @param {Object|null} point - объект точки или null для создания новой
   * @param {Array} destinations - список городов
   * @param {Array} options - список офферов
   */
  constructor(point = null, destinations = [], options = []) {
    this.point = point;
    this.destinations = destinations;
    this.options = options;
    this.element = null;
  }

  getTemplate() {
    // Подготовим данные с дефолтными значениями, если point === null
    const pointType = this.point?.type || 'flight';
    const destination = this.destinations.find((d) => d.id === this.point?.destinationId) || {
      cityName: '',
      description: '',
      photos: [],
    };
    const price = this.point?.price ?? '';
    const startTime = this.point?.startDate ?? '';
    const endTime = this.point?.endDate ?? '';
    const selectedOptionIds = this.point?.optionIds ?? [];

    // Формируем HTML для всех доступных опций (чекбоксы)
    const optionsTemplate = this.options.map((opt) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
               id="event-offer-${opt.id}"
               type="checkbox"
               name="event-offer-${opt.type}"
               ${selectedOptionIds.includes(opt.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${opt.id}">
          <span class="event__offer-title">${opt.name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${opt.price}</span>
        </label>
      </div>
    `).join('');

    // Список городов для datalist
    const cityOptions = this.destinations.map((d) => `<option value="${d.cityName}"></option>`).join('');

    // Возвращаем шаблон — динамически подставляем значения
    return `
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${pointType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.cityName}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${cityOptions}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${this.point ? 'Delete' : 'Cancel'}</button>
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
            <p class="event__destination-description">${destination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destination.photos.map((src) => `<img class="event__photo" src="${src}" alt="Event photo">`).join('')}
              </div>
            </div>
          </section>
        </section>
      </form>
    `;
  }

  // Создаём DOM-элемент лениво
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  // Очищаем кэш
  removeElement() {
    this.element = null;
  }
}
