import Table from '../../ui/Table';
import Empty from '../../ui/Empty';
import {
  BookingsResponse,
  useBookings,
} from '../../hooks/bookings/useBookings';
import Spinner from '../../ui/Spinner';
import BookingRow from './BookingRow';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { bookings, count, isLoading } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resource="bookings" />;

  const bookingsList = bookings as unknown as BookingsResponse[];

  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookingsList}
        render={(booking) => (
          <BookingRow key={booking.id} booking={booking as BookingsResponse} />
        )}
      />

      {count && (
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      )}
    </Table>
  );
}

export default BookingTable;
