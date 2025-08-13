import React, { createContext, useContext, ReactNode } from 'react';
import { useThemeViewModel } from '@/hooks/useThemeViewModel';

// Theme context type (same as view model return type)
type ThemeContextType = ReturnType<typeof useThemeViewModel>;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeViewModel = useThemeViewModel();

  return (
    <ThemeContext.Provider value={themeViewModel}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 