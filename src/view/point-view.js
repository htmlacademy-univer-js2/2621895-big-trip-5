import { createElement } from '../render.js';

export default class PointView {
  /**
   * @param {Object} point - объект точки маршрута (из model/mock.js)
   * @param {Array} destinations - массив пунктов назначения (model)
   * @param {Array} options - массив всех опций (model)
   */
  constructor(point, destinations = [], options = []) {
    this.point = point;
    this.destinations = destinations;
    this.options = options;
    this.element = null;
  }

  // Создаёт HTML-шаблон на основе данных.
  getTemplate() {
    // Находим связанный объект назначения по id.
    // Если не найден — используем заглушку, чтобы шаблон не ломался.
    const destination = this.destinations.find((d) => d.id === this.point.destinationId) || {
      cityName: '',
      description: '',
      photos: [],
    };

    // Находим опции, которые применимы к этой точке (по id).
    const pointOptions = this.options.filter(
      (o) => this.point.optionIds && this.point.optionIds.includes(o.id)
    );

    // Простейшее форматирование дат — пока оставляем строковые значения.
    const start = this.point.startDate || '';
    const end = this.point.endDate || '';

    return `
      <div class="event">
        <!-- Дата (показываем только дату в первой строке) -->
        <time class="event__date" datetime="${start}">${start ? start.split('T')[0] : ''}</time>

        <!-- Иконка типа события (при условии, что есть соответствующий файл в img/icons) -->
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this.point.type}.png" alt="Event type icon">
        </div>

        <!-- Заголовок: тип + город -->
        <h3 class="event__title">${this.point.type} ${destination.cityName}</h3>

        <!-- Время начала и окончания -->
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${start}">${start ? start.split('T')[1] : ''}</time>
            &mdash;
            <time class="event__end-time" datetime="${end}">${end ? end.split('T')[1] : ''}</time>
          </p>
        </div>

        <!-- Цена -->
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this.point.price}</span>
        </p>

        <!-- Список выбранных офферов -->
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

        <!-- Кнопка открытия редактирования -->
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }

  // Ленивое создание DOM-элемента — если ещё не создан, создаём через createElement.
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  // Сбрасываем ссылку на DOM — пригодится при перерисовке.
  removeElement() {
    this.element = null;
  }
}

