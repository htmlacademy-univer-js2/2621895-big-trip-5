import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EditView from '../view/edit-view.js';
import NewPointView from '../view/new-point-view.js';
import PointView from '../view/point-view.js';

import { render, replace, RenderPosition } from '../framework/render.js';

export default class TripPresenter {

  constructor({ filterContainer, tripEventsContainer, editContainer }, tripModel) {
    this.filterContainer = filterContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.editContainer = editContainer;

    this.tripModel = tripModel;

    this.pointViewMap = new Map();

    this._escHandler = this._escHandler.bind(this);

    // Инициализируем явно, чтобы логика _escHandler работала корректно
    this._openedPointId = null;
  }


  init() {
    const points = this.tripModel.getPoints();
    const destinations = this.tripModel.getDestinations();
    const options = this.tripModel.getOptions();

    render(new FilterView(), this.filterContainer, RenderPosition.BEFOREEND);
    render(new SortView(), this.tripEventsContainer, RenderPosition.AFTERBEGIN);
    render(new NewPointView(destinations, options), this.tripEventsContainer, RenderPosition.AFTERBEGIN);

    for (const point of points) {
      this.#renderPoint(point, destinations, options);
    }
  }

  /** Создаёт и рендерит пару PointView + EditView */
  #renderPoint(point, destinations, options) {

    const pointView = new PointView(
      point,
      destinations,
      options,
      {
        onRollupClick: () => this.#openEditForm(point)
      }
    );

    const editView = new EditView(
      point,
      destinations,
      options,
      {
        onSubmit: () => this.#closeEditForm(point),
        onRollupClick: () => this.#closeEditForm(point)
      }
    );

    this.pointViewMap.set(point.id, { pointView, editView });

    render(pointView, this.tripEventsContainer, RenderPosition.BEFOREEND);
  }

  /** Открыть форму */
  #openEditForm(point) {
    const views = this.pointViewMap.get(point.id);
    if (!views) {
      return;
    }

    const { pointView, editView } = views;

    replace(editView, pointView);

    // Глобальный обработчик ESC
    document.addEventListener('keydown', this._escHandler);
    this._openedPointId = point.id;
  }

  /** Закрыть форму */
  #closeEditForm(point) {
    const views = this.pointViewMap.get(point.id);
    if (!views) {
      return;
    }

    const { pointView, editView } = views;

    replace(pointView, editView);

    document.removeEventListener('keydown', this._escHandler);
    this._openedPointId = null;
  }

  /** Обработка ESC */
  _escHandler(evt) {
    if (evt.key === 'Escape' && this._openedPointId !== null) {
      const point = this.tripModel.getPoints().find((p) => p.id === this._openedPointId);
      if (point) {
        this.#closeEditForm(point);
      }
    }
  }
}
