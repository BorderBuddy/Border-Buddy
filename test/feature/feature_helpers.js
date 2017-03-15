import { Traveler } from '../../database/models';

export function cleanDatabase() {
  return Promise.all([
    Traveler.truncate()
  ]);
}
