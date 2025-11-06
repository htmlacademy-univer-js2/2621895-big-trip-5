import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EditView from '../view/edit-view.js';
import NewPointView from '../view/new-point-view.js';
import PointView from '../view/point-view.js';

import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  /**
   * @param {Object} containers - контейнеры DOM, куда рендерим
   * @param {HTMLElement} containers.filterContainer - контейнер для фильтров (шапка)
   * @param {HTMLElement} containers.tripEventsContainer - контейнер .trip-events (список)
   * @param {HTMLElement} containers.editContainer - контейнер для формы редактирования (может совпадать)
   * @param {TripModel} tripModel - экземпляр модели (данные)
   */
  constructor({ filterContainer, tripEventsContainer, editContainer }, tripModel) {
    this.filterContainer = filterContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.editContainer = editContainer;

    // Модель передаём извне, Presenter не знает, как модель устроена внутри
    this.tripModel = tripModel;
  }

  init() {
    // Получаем данные у модели
    const points = this.tripModel.getPoints();
    const destinations = this.tripModel.getDestinations();
    const options = this.tripModel.getOptions();

    // 1) Render фильтры — в контейнер шапки (filterContainer)
    // Компонент FilterView не зависит от данных сейчас — оставляем статичным
    render(new FilterView(), this.filterContainer, RenderPosition.BEFOREEND);

    // 2) Render сортировки — в начало секции .trip-events
    render(new SortView(), this.tripEventsContainer, RenderPosition.AFTERBEGIN);

    // 3) Render кнопки "New point" / или форма создания — сюда мы рендерим NewPointView
    // NewPointView может принимать destinations/options, но в этой учебной задаче статично — передадим массивы
    render(new NewPointView(destinations, options), this.tripEventsContainer, RenderPosition.AFTERBEGIN);

    // 4) Render формы редактирования первой точки (пример).
    // В реальном приложении форма появления обрабатывается по клику "edit".
    if (points.length > 0) {
      const editView = new EditView(points[0], destinations, options);
      render(editView, this.editContainer, RenderPosition.BEFOREEND);
    }

    // 5) Render всех точек маршрута на страницу — для каждой точке создаём PointView и отрисовываем.
    // Мы передаём в PointView: point, destinations и options, чтобы компонент мог "развернуть" ссылки по id.
    for (const point of points) {
      const pointView = new PointView(point, destinations, options);
      render(pointView, this.tripEventsContainer, RenderPosition.BEFOREEND);
    }
  }
}
