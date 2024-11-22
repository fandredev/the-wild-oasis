import ButtonIcon from '../../ui/ButtonIcon';
import { useLogout } from '../../hooks/auth/useLogout';
import SpinnerMini from '../../ui/SpinnerMini';
import { HiOutlineLogout } from 'react-icons/hi';

export default function Logout() {
  const { logout, isLoading } = useLogout();

  function handleLogout() {
    logout();
  }
  return (
    <ButtonIcon disabled={isLoading} onClick={() => handleLogout()}>
      {!isLoading ? <HiOutlineLogout /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
