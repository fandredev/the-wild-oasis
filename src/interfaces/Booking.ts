export interface IBooking {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: string;
  guests: {
    fullName: string;
    email: string;
  };
  cabins: {
    name: string;
  };
}

export interface Booking {
  booking: IBooking;
}
