import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();

  // Filter

  const filterValue = searchParams.get('status') || 'all';
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () =>
      getBookings({
        filter: filter,
      }),
  });

  return {
    isLoading,
    bookings,
    error,
  };
}
