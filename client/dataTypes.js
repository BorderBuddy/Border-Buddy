// @flow

export type Flight = {
  id: number,
  flightNum: string,
  airlineCode: string,
  status: 'arrived' | 'delayed' | 'scheduled',
  arrivalTime: string,
}

