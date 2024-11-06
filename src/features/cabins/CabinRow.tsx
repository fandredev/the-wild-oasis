import styled from 'styled-components';
import ICabin from '../../interfaces/Cabin';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from '../../hooks/cabins/useDeleteCabin';
import { FaTrash } from 'react-icons/fa';
import { Modal } from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  width: max-content;
`;

interface CabinRowProps {
  cabin: ICabin;
}

export default function CabinRow({ cabin }: CabinRowProps) {
  const cabinImage = cabin.image as unknown as string;
  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <>
      <Table.Row>
        <Img src={cabinImage} alt={cabin.description}></Img>
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.maxCapacity} guests</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        {cabin.discount ? (
          <Discount>{formatCurrency(cabin.discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button>
              <FaTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabin.id)}
            />
          </Modal.Window>
        </Modal>
      </Table.Row>
      {/* {showForm && <UpdateCabinForm cabinToEdit={cabin} />} */}
    </>
  );
}
