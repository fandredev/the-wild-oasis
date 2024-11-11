import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import ICabin from '../../interfaces/Cabin';
import { useCabins } from '../../hooks/cabins/useCabins';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';

type SortKey =
  | 'regularPrice-asc'
  | 'regularPrice-desc'
  | 'maxCapacity-asc'
  | 'maxCapacity-desc'
  | 'name-asc'
  | 'name-desc';

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

  const sortBy = (searchParams.get('sortBy') || 'startDate-asc') as SortKey;
  const sortCriteria: Record<SortKey, (a: ICabin, b: ICabin) => number> = {
    'regularPrice-asc': (a, b) => a.regularPrice - b.regularPrice,
    'regularPrice-desc': (a, b) => b.regularPrice - a.regularPrice,
    'maxCapacity-asc': (a, b) => a.maxCapacity - b.maxCapacity,
    'maxCapacity-desc': (a, b) => b.maxCapacity - a.maxCapacity,
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name),
  };

  filteredCabins.sort(sortCriteria[sortBy] || (() => 0));

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
