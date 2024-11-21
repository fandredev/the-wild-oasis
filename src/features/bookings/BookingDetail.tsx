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
import { useDeleteBooking } from '../../hooks/bookings/deleteBooking';
import { Modal } from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useEspecificBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckOut } = useCheckout();
  const { bookingDelete, isDeletingBooking } = useDeleteBooking();

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
            <Modal>
              <Modal.Open opens="delete">
                <Button
                  variation="danger"
                  className="icon"
                  onClick={() =>
                    bookingDelete(+booking.id, {
                      onSettled: () => {
                        navigate(-1);
                      },
                    })
                  }
                  disabled={isDeletingBooking}
                >
                  Remover
                </Button>
              </Modal.Open>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="booking"
                  onConfirm={() =>
                    bookingDelete(+booking.id, {
                      onSettled: () => {
                        navigate(-1);
                      },
                    })
                  }
                  disabled={isDeletingBooking}
                />
              </Modal.Window>
            </Modal>
            {booking.status === 'unconfirmed' && (
              <Button
                className="icon"
                onClick={() => navigate(`/checkin/${booking.id}`)}
              >
                Check-in
              </Button>
            )}

            {booking.status === 'checked-in' && (
              <Button
                className="icon"
                onClick={() => checkout(+booking.id)}
                disabled={isCheckOut}
              >
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
