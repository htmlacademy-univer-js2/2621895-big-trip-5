import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EditView from '../view/edit-view.js';
import NewPointView from '../view/new-point-view.js';
import PointView from '../view/point-view.js';

import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  constructor({ filterContainer, tripEventsContainer, editContainer, newPoint, point}) {
    this.filterContainer = filterContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.editContainer = editContainer;
    this.newPoint = newPoint;
    this.point = point;
  }

  init() {
    for (let i = 0; i < 4; i ++){
      render(new PointView(), this.point, RenderPosition.AFTERBEGIN);
    }
    // Отрисовать фильтры в шапку
    render(new FilterView(), this.filterContainer);

    render(new EditView(), this.editContainer, RenderPosition.AFTERBEGIN);
    // Отрисовать сортировку в начало секции trip-events
    render(new SortView(), this.tripEventsContainer, RenderPosition.AFTERBEGIN);

    render(new NewPointView(), this.newPoint, RenderPosition.AFTERBEGIN);


  }
}


