import TripPresenter from './presenter/trip-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters'); // находим контейнер на странице
const tripEventsContainer = document.querySelector('.trip-events');
const editContainer = document.querySelector('.trip-events');
const newPoint = document.querySelector('.trip-events');
const point = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({ filterContainer, tripEventsContainer, editContainer, newPoint, point }); // создаём презентер, передаём контейнер
tripPresenter.init(); // запускаем отрисовку


