import { createElement } from '../render.js';

// Компонент отвечает за отображение одной точки маршрута (event / point)
export default class PointView {
  // Конструктор получает данные "снаружи" — сам компонент ничего не загружает и не создаёт.
  constructor(point, destinations = [], options = []) {
    this.point = point;
    this.destinations = destinations;
    this.options = options;
    this.element = null;// this.element хранит созданный DOM-элемент, чтобы не пересоздавать его каждый раз.
  }

  getTemplate() { // Метод создаёт HTML-шаблон точки маршрута.
    // Находим пункт назначения по id точки маршрута.
    // Если не нашли (например, данные ещё не загружены), подставляем "пустой" объект-заглушку.
    const destination = this.destinations.find((d) => d.id === this.point.destinationId) || {
      cityName: '', description: '', photos: []
    };
    // Отбираем только те опции, id которых указаны в точке маршрута.
    // Проверяем, что this.point.optionIds вообще существует (иначе может быть ошибка).
    const pointOptions = this.options.filter(
      (o) => this.point.optionIds && this.point.optionIds.includes(o.id)
    );

    // форматирование дат/времени можно улучшить при следующем шаге
    const start = this.point.startDate ? this.point.startDate : '';
    const end = this.point.endDate ? this.point.endDate : '';

    return `
      <div class="event">
        <time class="event__date" datetime="${start}">${start ? start.split('T')[0] : ''}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this.point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this.point.type} ${destination.cityName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${start}">${start ? start.split('T')[1] : ''}</time>
            &mdash;
            <time class="event__end-time" datetime="${end}">${end ? end.split('T')[1] : ''}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this.point.price}</span>
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
    `;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
