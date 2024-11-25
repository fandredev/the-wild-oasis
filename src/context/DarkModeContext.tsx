import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const darkModeClass = 'dark-mode';

interface DarkModeProviderProps {
  children: React.ReactNode;
}

interface DarkModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextProps>(
  {} as DarkModeContextProps
);

export default function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode: boolean) => !isDarkMode);
  }

  useEffect(() => {
    const classListDocument = document.documentElement.classList;

    if (isDarkMode) {
      classListDocument.add(darkModeClass);
    } else {
      classListDocument.remove(darkModeClass);
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
