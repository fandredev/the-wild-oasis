import { useCheckout } from '../../hooks/check-out/useCheckout';
import Button from '../../ui/Button';

function CheckoutButton({ bookingId }: { bookingId: string }) {
  const { checkout, isCheckOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckOut}
      onClick={() => checkout(+bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
