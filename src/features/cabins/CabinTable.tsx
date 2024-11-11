import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import ICabin from '../../interfaces/Cabin';
import { useCabins } from '../../hooks/cabins/useCabins';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const cabinsData = cabins as unknown as ICabin[];

  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;

  if (filterValue === 'no-discount') {
    filteredCabins = cabinsData.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === 'with-discount') {
    filteredCabins = cabinsData.filter((cabin) => cabin.discount > 0);
  } else {
    filteredCabins = cabinsData;
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Actions</div>
      </Table.Header>
      <Table.Body
        // data={cabinsData}
        data={filteredCabins}
        render={(cabin: ICabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}
