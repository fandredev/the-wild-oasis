import styled from 'styled-components';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useEspecificBooking } from '../../hooks/bookings/useEspecificBooking';
import Spinner from '../../ui/Spinner';
import { IBooking } from '../../interfaces/Booking';
import BookingDataBox from './BookingDataBox';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../hooks/check-out/useCheckout';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useEspecificBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout } = useCheckout();

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      {booking && (
        <>
          <Row type="horizontal">
            <HeadingGroup>
              <Heading as="h1">Booking #{booking.id}</Heading>
              <Tag type={statusToTagName[booking.status]}>
                {booking.status.replace('-', ' ')}
              </Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          </Row>

          <BookingDataBox booking={booking as unknown as IBooking} />

          <ButtonGroup>
            {booking.status === 'unconfirmed' && (
              <Button
                className="icon"
                onClick={() => navigate(`/checkin/${booking.id}`)}
              >
                Check-in
              </Button>
            )}

            {booking.status === 'checked-in' && (
              <Button className="icon" onClick={() => checkout(+booking.id)}>
                Check-out
              </Button>
            )}
            <Button variation="secondary" onClick={moveBack}>
              Back
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  );
}

export default BookingDetail;
