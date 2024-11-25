import styled from 'styled-components';
import { useRecentBookings } from '../../hooks/bookings/useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from '../../hooks/bookings/useRecentStays';
import Stats from './Stats';
import { useCabins } from '../../hooks/cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();

  const { isLoading: isLoadingCabins } = useCabins();

  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <>
      <StyledStats>
        <Stats bookings={bookings} confirmedStays={confirmedStays} />
      </StyledStats>
      <DurationChart confirmedStays={confirmedStays} />

      <StyledDashboardLayout>
        <SalesChart bookings={bookings} numDays={numDays} />
      </StyledDashboardLayout>
    </>
  );
}
