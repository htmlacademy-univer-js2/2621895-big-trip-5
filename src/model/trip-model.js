import { destinations, options, points } from './mock.js';

export default class TripModel {
  constructor() {
    // Копируем данные (по желанию можно клонировать, чтобы защитить от мутаций)
    this._destinations = destinations;
    this._options = options;
    this._points = points;
  }

  // Возвращаем массив точек маршрута
  getPoints() {
    return this._points;
  }

  // Возвращаем массив пунктов назначения
  getDestinations() {
    return this._destinations;
  }

  // Возвращаем массив доступных опций
  getOptions() {
    return this._options;
  }
}
