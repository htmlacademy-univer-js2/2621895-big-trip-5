import { destinations, options, points } from './mock.js';

export default class TripModel {
  getPoints() {
    return points;
  }

  getDestinations() {
    return destinations;
  }

  getOptions() {
    return options;
  }
}
