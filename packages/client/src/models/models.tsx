export interface User {
    id: number,
    email: string,
    phone: string,
}

export interface Flight {
    actualArrivalTime: Date,
    airlineCode: string,
    flightNum: string,
    id: number,
    scheduledArrivalTime: Date,
    status: string,
}

export interface Traveler {
    connectivity: boolean,
    countryCode: string,
    email: string,
    flight: Flight,
    flightId: number,
    id: number,
    name: string,
    nationality: string,
    phone: string,
    preferredLanguage: string,
    representative: User,
    requireInterpreter: boolean,
    secondaryContactName: string,
    secondaryContactPhone: string,
    secondaryContactRelation: string,
    status: string,
}
