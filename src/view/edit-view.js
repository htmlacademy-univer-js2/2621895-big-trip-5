import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export default class EditView extends AbstractStatefulView {
  /**
   * @param {Object} point
   * @param {Array} destinations
   * @param {Array} options
   * @param {Object} handlers - { onSubmit, onRollupClick }
   */
  constructor(point, destinations = [], options = [], handlers = {}) {
    super();

    this._state = {
      point,
      destinations,
      options
    };

    this._onSubmit = handlers.onSubmit || (() => {});
    this._onRollupClick = handlers.onRollupClick || (() => {});

    // Восстанавливаем обработчики для первого рендера
    this._restoreHandlers();
  }

  /** Кнопка закрытия (стрелка вверх) */
  get rollupButton() {
    return this.element.querySelector('.event__rollup-btn');
  }

  get formElement() {
    return this.element.querySelector('form');
  }

  get template() {
    const point = this._state.point;
    // eslint-disable-next-line no-unused-vars
    const pointType = point?.type || 'flight';

    return `
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Close</span>
          </button>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
        </header>
      </form>
    `;
  }

  _restoreHandlers() {
    if (this.formElement) {
      this.formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._onSubmit();
      });
    }

    if (this.rollupButton) {
      this.rollupButton.addEventListener('click', () => {
        this._onRollupClick();
      });
    }
  }
}
