import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EditView from '../view/edit-view.js';
import NewPointView from '../view/new-point-view.js';
import PointView from '../view/point-view.js';
import EmptyListView from '../view/empty-list-view.js';

import { generateFilters, generateSorts } from '../mock.js';

import { render, replace, RenderPosition } from '../framework/render.js';

export default class TripPresenter {

  constructor({ filterContainer, tripEventsContainer, editContainer }, tripModel) {
    // Контейнер для фильтров
    this.filterContainer = filterContainer;

    // Контейнер для списка точек
    this.tripEventsContainer = tripEventsContainer;

    // Контейнер для формы редактирования (если понадобится отдельно)
    this.editContainer = editContainer;

    // Модель с данными
    this.tripModel = tripModel;

    // Map для хранения пары PointView + EditView по id точки
    this.pointViewMap = new Map();

    // Привязываем контекст для ESC
    this._escHandler = this._escHandler.bind(this);

    // Храним id открытой точки
    this._openedPointId = null;
  }


  // Основной метод запуска презентера
  init() {
    // Получаем ВСЕ данные из модели
    const points = this.tripModel.getPoints();
    const destinations = this.tripModel.getDestinations();
    const options = this.tripModel.getOptions();

    // -----------------------------
    // ФИЛЬТРЫ ТЕПЕРЬ ЗАВИСЯТ ОТ ДАННЫХ
    // -----------------------------
    const filters = generateFilters(points.length);
    render(
      new FilterView(filters),
      this.filterContainer,
      RenderPosition.BEFOREEND
    );

    // -----------------------------
    // СОРТИРОВКА ТЕПЕРЬ ИЗ ДАННЫХ
    // -----------------------------
    const sorts = generateSorts();
    render(
      new SortView(sorts),
      this.tripEventsContainer,
      RenderPosition.AFTERBEGIN
    );

    // -----------------------------
    // ФОРМА СОЗДАНИЯ НОВОЙ ТОЧКИ
    // -----------------------------
    render(
      new NewPointView(destinations, options),
      this.tripEventsContainer,
      RenderPosition.AFTERBEGIN
    );

    // -----------------------------
    // ЕСЛИ НЕТ ТОЧЕК — ПОКАЗЫВАЕМ ЗАГЛУШКУ
    // -----------------------------
    if (points.length === 0) {
      render(
        new EmptyListView(),
        this.tripEventsContainer,
        RenderPosition.BEFOREEND
      );
      return; // дальше точки не рендерим
    }

    // -----------------------------
    // РЕНДЕР ВСЕХ ТОЧЕК
    // -----------------------------
    for (const point of points) {
      this.#renderPoint(point, destinations, options);
    }
  }


  // Создание пары: PointView + EditView
  #renderPoint(point, destinations, options) {

    // Обычная карточка точки
    const pointView = new PointView(
      point,
      destinations,
      options,
      {
        onRollupClick: () => this.#openEditForm(point)
      }
    );

    // Форма редактирования точки
    const editView = new EditView(
      point,
      destinations,
      options,
      {
        onSubmit: () => this.#closeEditForm(point),
        onRollupClick: () => this.#closeEditForm(point)
      }
    );

    // Сохраняем обе в map
    this.pointViewMap.set(point.id, { pointView, editView });

    // Рендерим обычную карточку
    render(pointView, this.tripEventsContainer, RenderPosition.BEFOREEND);
  }


  // Открытие формы редактирования
  #openEditForm(point) {
    const views = this.pointViewMap.get(point.id);
    if (!views) {
      return;
    }

    const { pointView, editView } = views;

    // Заменяем карточку на форму
    replace(editView, pointView);

    // Вешаем глобальный обработчик ESC
    document.addEventListener('keydown', this._escHandler);

    // Запоминаем открытую точку
    this._openedPointId = point.id;
  }


  // Закрытие формы редактирования
  #closeEditForm(point) {
    const views = this.pointViewMap.get(point.id);
    if (!views) {
      return;
    }

    const { pointView, editView } = views;

    // Возвращаем обычную карточку
    replace(pointView, editView);

    // Убираем ESC
    document.removeEventListener('keydown', this._escHandler);

    this._openedPointId = null;
  }


  // Глобальный обработчик ESC
  _escHandler(evt) {
    if (evt.key === 'Escape' && this._openedPointId !== null) {
      const point = this.tripModel
        .getPoints()
        .find((p) => p.id === this._openedPointId);

      if (point) {
        this.#closeEditForm(point);
      }
    }
  }
}
