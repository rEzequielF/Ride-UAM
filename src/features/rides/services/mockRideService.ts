import { IRideService } from './IRideService';
import { Ride, CreateRideData } from '../types/ride.types';
import { MOCK_RIDES } from '../mocks/rides.mock';

// Estado local reactivo en memoria para simular altas y cambios durante la sesión
let inMemoryRides: Ride[] = [...MOCK_RIDES];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockRideService: IRideService = {
  async getAvailableRides(): Promise<Ride[]> {
    await delay(300);
    // Retorna viajes activos que no estén completados ni cancelados
    return inMemoryRides.filter(
      (ride) => ride.status === 'published' || ride.status === 'full'
    );
  },

  async getUserRides(userId: string): Promise<Ride[]> {
    await delay(300);
    // Devuelve los viajes asociados al usuario como conductor
    return inMemoryRides.filter((ride) => ride.driverId === userId);
  },

  async createRide(driverId: string, data: CreateRideData): Promise<Ride> {
    await delay(300);

    const newRide: Ride = {
      id: `ride-${Date.now()}`,
      driverId,
      driver: {
        id: driverId,
        fullName: 'Usuario UAM',
        avatarUrl: undefined,
        driverRating: 5.0,
        totalRidesAsDriver: 1,
      },
      vehicle: {
        id: `veh-temp-${Date.now()}`,
        brand: 'Kia',
        model: 'Rio',
        color: 'Negro',
        plate: 'M 999 000',
        totalSeats: data.totalSeats + 1,
      },
      origin: data.origin,
      destination: data.destination,
      departureDate: data.departureDate,
      departureTime: data.departureTime,
      pricePerSeat: data.pricePerSeat,
      totalSeats: data.totalSeats,
      availableSeats: data.totalSeats,
      status: 'published',
      notes: data.notes,
      createdAt: new Date().toISOString(),
    };

    inMemoryRides = [newRide, ...inMemoryRides];
    return newRide;
  },
};