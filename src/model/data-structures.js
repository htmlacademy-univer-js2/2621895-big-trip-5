// data-structures.js — только структуры данных

// Опция
export const createOption = (id, type, name, price, isChecked = false) => ({
  id,
  type,
  name,
  price,
  isChecked,
});

// Пункт назначения
export const createDestination = (id, cityName, description, photos = []) => ({
  id,
  cityName,
  description,
  photos,
});

// Точка маршрута
export const createPoint = (id, type, destinationId, startDate, endDate, price, optionIds = []) => ({
  id,
  type,
  destinationId,
  startDate,
  endDate,
  price,
  optionIds,
});
