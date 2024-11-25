import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useClickOutsideModal } from '../hooks/useClickOutsideModal';

export const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

export const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// interface ModalProps {
//   children: ReactNode;
//   onClose?: () => void;
// }
// export default function Modal({ children, onClose }: ModalProps) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>
//         {children}
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

// Compound Component Pattern

const ModalContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open: (_name: string) => {},
  close: () => {},
  openName: '',
});

interface WindowProps {
  children: ReactNode;
  name: 'cabin-form' | 'delete';
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(ModalContext);

  const ref = useClickOutsideModal(close);

  // Renderizar apenas quando o `name` corresponde ao `openName`
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children as ReactElement, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: { children: ReactElement; opens: string }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

Modal.Open = Open;
Modal.Window = Window;
