import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useEspecificBooking } from '../../hooks/bookings/useEspecificBooking';
import { IBooking } from '../../interfaces/Booking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import { useChecking } from '../../hooks/check-in/useCheckin';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useChecking();
  const { booking, isLoading } = useEspecificBooking();

  const isPaidHotel = booking?.isPaid;

  useEffect(() => {
    setConfirmPaid(isPaidHotel || false);
  }, [isPaidHotel]);

  if (isLoading) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return;
    const bookingId = booking?.id as unknown as number;

    checkin(bookingId);
  }

  return (
    <>
      {booking && (
        <>
          <Row type="horizontal">
            <Heading as="h1">Check in booking #{booking.id}</Heading>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          </Row>

          <BookingDataBox booking={booking as unknown as IBooking} />

          <Box>
            <Checkbox
              checked={confirmPaid}
              disabled={confirmPaid || isCheckingIn}
              id="confirm"
              onChange={() => setConfirmPaid((confirm) => !confirm)}
            >
              I confirm that {booking.guests.fullName} has paid the total amount
              of {formatCurrency(booking.totalPrice ?? 0)}
            </Checkbox>
          </Box>

          <ButtonGroup>
            <Button
              disabled={!confirmPaid || isCheckingIn}
              onClick={handleCheckin}
            >
              Check in booking #{booking.id}
            </Button>
            <Button variation="secondary" onClick={moveBack}>
              Back
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  );
}

export default CheckinBooking;
