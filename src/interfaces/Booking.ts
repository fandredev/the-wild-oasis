import ICabin from './Cabin';
import { IGuests } from './Guests';

export interface IBooking {
  cabinId: string;
  cabinPrice: number | null;
  cabins: ICabin;

  created_at: string;
  endDate: string;
  extrasPrice: number | null;
  guests: IGuests;
  hasBreakfast: boolean;
  id: string;
  isPaid: boolean;
  numGuests: number;
  numNights: number | null;
  observations: string;
  startDate: string;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  totalPrice: number | null;
}

export interface Booking {
  booking: IBooking;
}

export interface BookingsDetail {
  cabins: ICabin;
  created_at: string;
  endDate: string;
  guests: IGuests;
  id: number;
  numGuests: number;
  numNights: number;
  startDate: string;
  status: string;
  totalPrice: number;
}
