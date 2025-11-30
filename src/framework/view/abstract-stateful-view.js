import AbstractView from './abstract-view.js';

/**
 * Абстрактный класс представления с состоянием
 */
export default class AbstractStatefulView extends AbstractView {
  /** @type {Object} Объект состояния */
  _state = {};

  /**
   * Метод для обновления состояния и перерисовки элемента
   * @param {Object} update Объект с обновлённой частью состояния
   */
  updateElement(update) {
    if (!update) {
      return;
    }

    this._setState(update);

    this.#rerenderElement();
  }

  /**
   * Метод для восстановления обработчиков после перерисовки элемента
   * @abstract
   */
  _restoreHandlers() {
    throw new Error('Abstract method not implemented: _restoreHandlers');
  }

  /**
   * Метод для обновления состояния
   * @param {Object} update Объект с обновлённой частью состояния
   */
  _setState(update) {
    // Создаём копию состояния, чтобы избежать мутаций
    this._state = structuredClone({ ...this._state, ...update });
  }

  /** Метод для перерисовки элемента */
  #rerenderElement() {
    const prevElement = this.element;
    const parent = prevElement.parentElement;

    // Сбрасываем кэш элемента в компоненте gfgfgf
    this.removeElement();

    const newElement = this.element;

    if (!parent) {
      // Нечего заменять — родитель не найден gfgffg
      return;
    }

    parent.replaceChild(newElement, prevElement);

    // Восстанавливаем обработчики на новом элементе
    this._restoreHandlers();
  }
}
