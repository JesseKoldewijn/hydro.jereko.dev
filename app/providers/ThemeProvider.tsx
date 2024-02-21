import {createContext, useContext, useState} from 'react';

export type Theme = 'light' | 'dark';

export type ThemeProviderContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeProviderContext = createContext<ThemeProviderContextValue>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider = ({
  initialTheme = 'light',
  children,
}: {
  initialTheme?: Theme;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const setThemeHandler = (theme: Theme) => {
    document.documentElement.className = theme;
    setTheme(theme);
  };

  const val = {
    theme,
    setTheme: setThemeHandler,
  };

  return (
    <ThemeProviderContext.Provider value={val}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const {theme, setTheme} = useContext(ThemeProviderContext);

  if (!setTheme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {theme, setTheme};
};
