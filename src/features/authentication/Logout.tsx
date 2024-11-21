import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from '../../hooks/auth/useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

export default function Logout() {
  const { logout, isLoading } = useLogout();

  function handleLogout() {
    logout();
  }
  return (
    <ButtonIcon disabled={isLoading} onClick={() => handleLogout()}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
