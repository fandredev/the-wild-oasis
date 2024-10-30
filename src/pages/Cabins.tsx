import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import { useState } from 'react';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  const [showForm, setShowform] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row type="vertical">
        <CabinTable />
        <Button onClick={() => setShowform((show) => !show)}>
          Add new cabin
        </Button>
      </Row>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
