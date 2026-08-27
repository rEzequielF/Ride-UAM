import { Ride, CreateRideData } from '../types/ride.types';

export interface IRideService{
    getAvailableRides(): Promise<Ride[]>;
    getUserRides(userId: string): Promise<Ride[]>;
    createRide(driverId: string, data: CreateRideData): Promise<Ride>;
}