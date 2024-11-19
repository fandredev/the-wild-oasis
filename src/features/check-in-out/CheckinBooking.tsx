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
import { useCheckin } from '../../hooks/check-in/useCheckin';
import { useUserSettings } from '../../hooks/settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const { booking, isLoading } = useEspecificBooking();
  const { settings, isLoading: isLoadingSettings } = useUserSettings();

  const isPaidHotel = booking?.isPaid;

  const optionalBreakfastPrice =
    (settings?.breakfastPrice ?? 0) *
    (booking?.numNights ?? 0) *
    (booking?.numGuests ?? 0);

  useEffect(() => {
    setConfirmPaid(isPaidHotel || false);
  }, [isPaidHotel]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return;
    const bookingId = booking?.id as unknown as number;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: (booking?.totalPrice ?? 0) + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({
        bookingId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        breakfast: {} as unknown as any,
      });
    }
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

          {!booking.hasBreakfast && (
            <Box>
              <Checkbox
                checked={addBreakfast}
                disabled={false}
                onChange={() => {
                  setAddBreakfast((add) => !add);
                  setConfirmPaid(false);
                }}
                id="breakfast"
              >
                Want to add breakfast for{' '}
                {formatCurrency(optionalBreakfastPrice)}?
              </Checkbox>
            </Box>
          )}

          <Box>
            <Checkbox
              checked={confirmPaid}
              onChange={() => setConfirmPaid((confirm) => !confirm)}
              disabled={confirmPaid || isCheckingIn}
              id="confirm"
            >
              I confirm that {booking.guests.fullName} has paid the total amount
              of{' '}
              {!addBreakfast
                ? formatCurrency(booking.totalPrice ?? 0)
                : `${formatCurrency(
                    (booking.totalPrice ?? 0) + optionalBreakfastPrice
                  )} (${formatCurrency(
                    booking.totalPrice ?? 0
                  )} + ${formatCurrency(optionalBreakfastPrice)})`}
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
