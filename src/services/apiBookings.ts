import { IBooking } from '../interfaces/Booking';
import { PAGE_SIZE } from '../utils/constants';
import { getToday } from '../utils/helpers';
import { supabase } from './supabase';

interface GetBookingsProps {
  filter: null | { field: string; value: string | null };
  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
}

export async function getBookings({ filter, sortBy, page }: GetBookingsProps) {
  let query = supabase
    .from('bookings')
    .select(
      'id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice, cabins(name), guests(fullName, email)',
      {
        count: 'exact',
      }
    )
    .order('created_at', { ascending: false });

  if (filter) query.eq(filter.field, filter.value);
  if (sortBy)
    query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return { data, count };
}

export async function getBooking(id: number): Promise<IBooking> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data as unknown as IBooking;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string): Promise<
  {
    created_at: string;
    totalPrice: number | null;
    extrasPrice: number | null;
  }[]
> {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data as unknown as IBooking[];
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string): Promise<IBooking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data as unknown as IBooking[];
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(
  id: number,
  obj: object
): Promise<IBooking> {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data as unknown as IBooking;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
