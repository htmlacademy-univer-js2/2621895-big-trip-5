import { createOption, createDestination, createPoint } from './data-structures.js';

const destinations = [
  createDestination(1, 'Amsterdam', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eros mauris.', ['https://loremflickr.com/248/152?random=1']),
  createDestination(2, 'Geneva', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.', ['https://loremflickr.com/248/152?random=2']),
  createDestination(3, 'Chamonix', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', ['https://loremflickr.com/248/152?random=3']),
];

const options = [
  createOption(1, 'flight', 'Add luggage', 50, true),
  createOption(2, 'flight', 'Switch to comfort', 80, true),
  createOption(3, 'flight', 'Add meal', 15, false),
  createOption(4, 'train', 'Travel by train', 40, false),
  createOption(5, 'bus', 'Order Uber', 20, false),
];

const points = [
  createPoint(1, 'flight', 3, '2025-10-21T12:25', '2025-10-21T13:35', 160, [1, 2]),
  createPoint(2, 'bus', 2, '2025-10-22T09:00', '2025-10-22T10:00', 50, [5]),
  createPoint(3, 'train', 1, '2025-10-23T14:00', '2025-10-23T16:30', 120, [4]),
];

// ✅ ГЕНЕРАТОР ФИЛЬТРОВ (ПО ТЗ)
const generateFilters = (pointsCount) => ([
  { type: 'everything', name: 'Everything', isChecked: true, isDisabled: pointsCount === 0 },
  { type: 'future', name: 'Future', isChecked: false, isDisabled: pointsCount === 0 },
  { type: 'present', name: 'Present', isChecked: false, isDisabled: true },
  { type: 'past', name: 'Past', isChecked: false, isDisabled: true },
]);

// ✅ ГЕНЕРАТОР СОРТИРОВОК
const generateSorts = () => ([
  { type: 'day', name: 'Day', isChecked: true, isDisabled: false },
  { type: 'event', name: 'Event', isChecked: false, isDisabled: true },
  { type: 'time', name: 'Time', isChecked: false, isDisabled: false },
  { type: 'price', name: 'Price', isChecked: false, isDisabled: false },
  { type: 'offer', name: 'Offers', isChecked: false, isDisabled: true },
]);

export {
  destinations,
  options,
  points,
  generateFilters,
  generateSorts
};
