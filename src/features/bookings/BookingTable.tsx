import Table from '../../ui/Table';
import { StyledMenu } from '../../ui/Menus';
import Empty from '../../ui/Empty';
import {
  BookingsResponse,
  useBookings,
} from '../../hooks/bookings/useBookings';
import Spinner from '../../ui/Spinner';
import BookingRow from './BookingRow';

function BookingTable() {
  const { bookings, isLoading } = useBookings();

  if (!bookings?.length) return <Empty resource="bookings" />;
  if (isLoading) return <Spinner />;

  const bookingsList = bookings as unknown as BookingsResponse[];

  return (
    <StyledMenu>
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
            <BookingRow
              key={booking.id}
              booking={booking as BookingsResponse}
            />
          )}
        />
      </Table>
    </StyledMenu>
  );
}

export default BookingTable;
