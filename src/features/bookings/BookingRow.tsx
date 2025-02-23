import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { HiEye } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { BookingsResponse } from '../../hooks/bookings/useBookings';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

const ContainerActions = styled.div`
  display: flex;
  justify-content: flex-end;

  .icon {
    cursor: pointer;
    font-size: 1.6rem;
    color: var(--color-grey-500);

    &:last-child {
      position: relative;
      bottom: 2px;
      margin-left: 3px;
    }
  }
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: {
  booking: BookingsResponse;
}) {
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: 'info',
    'checked-in': 'success',
    'checked-out': 'warning',
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status as keyof typeof statusToTagName]}>
        {status.replace('-', ' ')}
      </Tag>

      <Amount>{formatCurrency(totalPrice ?? 0)}</Amount>

      <ContainerActions>
        <HiEye
          className="icon"
          onClick={() => navigate(`/bookings/${bookingId}`)}
        />
        {/* {status === 'unconfirmed' && (
          <HiArrowDownOnSquare
            className="icon"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          />
        )}
        {status === 'checked-in' && (
          <HiArrowUpOnSquare
            className="icon"
            onClick={() => checkout(+bookingId)}
          />
        )} */}
      </ContainerActions>
    </Table.Row>
  );
}

export default BookingRow;
