import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export interface BookingsResponse {
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

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });

  return {
    isLoading,
    bookings,
    error,
  };
}
