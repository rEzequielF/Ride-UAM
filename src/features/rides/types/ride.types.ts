export type RideStatus =
    | 'published'
    | 'full'
    | 'inProgress'
    | 'completed'
    | 'cancelled';

export interface RideDriver{
    id: string;
    fullName: string;
    avatarUrl?: string;
    driverRating: number;
    totalRidesAsDriver: number;
}

export interface RideVehicle{
    id: string;
    brand: string;
    model: string;
    color: string;
    plate: string;
    totalSeats: number;
}

export interface Ride{
    id: string;
    driverId: string;
    driver: RideDriver;
    vehicle: RideVehicle;
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    pricePerSeat: number;
    totalSeats: number;
    availableSeats: number;
    status: RideStatus;
    notes?: string;
    createdAt: string;
}

export interface CreateRideData{
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    pricePerSeat: number;
    totalSeats: number;
    notes?: string;
}