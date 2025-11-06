import TripPresenter from './presenter/trip-presenter.js';
import TripModel from './model/trip-model.js';

// Контейнеры DOM — проверь в разметке, что селекторы существуют.
// Обычно:
// - .trip-controls__filters — контейнер в шапке для фильтров
// - .trip-events — основной контейнер списка событий
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
// Место для формы редактирования — в демо обычно .trip-events или .trip-main
const editContainer = document.querySelector('.trip-events') || tripEventsContainer;

// Создаём модель (внутри она использует mock.js)
const tripModel = new TripModel();

// Создаём презентер и передаём контейнеры + модель
const tripPresenter = new TripPresenter({
  filterContainer,
  tripEventsContainer,
  editContainer
}, tripModel);

// Запускаем
tripPresenter.init();
