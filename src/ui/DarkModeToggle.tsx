import useDarkMode from '../hooks/dark-mode/useDarkMode';
import ButtonIcon from './ButtonIcon';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}
