import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

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
  const queryClient = useQueryClient();

  // Filter

  const filterValue = searchParams.get('status') || 'all';
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [sortByField, sortByDirection] = sortByRaw.split('-');
  const sortBy = { field: sortByField, direction: sortByDirection };

  const page = !searchParams.get('page')
    ? 1
    : parseInt(searchParams.get('page')!, 10);

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
        page,
      }),
  });

  // Pre-fetching
  const pageCount = Math.ceil((bookings?.count ?? 0) / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page + 1,
        }),
    });

  return {
    isLoading,
    bookings,
    error,
  };
}
