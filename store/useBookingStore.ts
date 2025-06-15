import { create } from 'zustand';

type Booking = {
    id: string;
    propertyId: string;
    userId: string;
    checkIn: string;
    checkOut: string;
    status: string;
};

type BookingState = {
    bookings: Booking[];
    setBookings: (bookings: Booking[]) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
    bookings: [],
    setBookings: (bookings) => set({ bookings }),
}));
