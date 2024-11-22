import styled from 'styled-components';
import useDarkMode from '../hooks/dark-mode/useDarkMode';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

export default function Logo() {
  const { isDarkMode } = useDarkMode();
  const srcLogo = isDarkMode ? '/logo-light.png' : '/logo-dark.png';

  return (
    <StyledLogo>
      <Img src={srcLogo} alt="Logotipo Wild Oasis" />
    </StyledLogo>
  );
}
