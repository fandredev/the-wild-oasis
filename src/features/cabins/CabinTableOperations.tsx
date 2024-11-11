import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            label: 'All',
            value: 'all',
          },
          {
            label: 'No discount',
            value: 'no-discount',
          },
          {
            label: 'With discount',
            value: 'with-discount',
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
