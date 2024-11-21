import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: bookingDelete, isPending: isDeletingBooking } = useMutation({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`Booking successfully deleted`);

      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      navigate('/');
    },
    onError: (err) => {
      toast.error(err.message || 'An error occurred. Please try again later');
    },
  });

  return { bookingDelete, isDeletingBooking };
}
