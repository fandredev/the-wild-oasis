import { HiOutlineBriefcase } from 'react-icons/hi';
import { IBooking } from '../../interfaces/Booking';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

interface StatsProps {
  bookings:
    | {
        created_at: string;
        totalPrice: number | null;
        extrasPrice: number | null;
      }[]
    | undefined;
  confirmedStays: IBooking[] | undefined;
}

export default function Stats({ bookings, confirmedStays }: StatsProps) {
  // Calculate the number of bookings
  const numBookings = bookings?.length;

  // Calculate the total sales
  const totalSales = bookings?.reduce((acc, curr) => {
    return acc + (curr.totalPrice || 0);
  }, 0);
  const totalSalesFormatted = formatCurrency(totalSales ?? 0);

  // Calculate the check ins

  const checkins = confirmedStays?.length;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={totalSalesFormatted}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
    </>
  );
}
