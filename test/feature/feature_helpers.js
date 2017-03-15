import { Traveler, Flight, User } from '../../database/models';

export function cleanDatabase() {
  return Promise.all([
    Traveler.truncate()
  ]);
}
