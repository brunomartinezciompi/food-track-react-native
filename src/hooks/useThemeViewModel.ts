import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from '@/constants/Colors';

export const useThemeViewModel = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme: Theme = isDark ? darkTheme : lightTheme;

  console.log('🎨 [THEME_VM] Theme changed:', {
    colorScheme,
    isDark,
    themeName: isDark ? 'dark' : 'light',
  });

  // Helper methods
  const toggleTheme = () => {
    // Note: This would require implementing manual theme switching
    // For now, we follow system preference
    console.log('🎨 [THEME_VM] Manual theme toggle not implemented - following system');
  };

  const getColorByPath = (path: string) => {
    // Helper to get nested color values by path like 'text.primary'
    const keys = path.split('.');
    let value: any = theme;
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) break;
    }
    
    return value;
  };

  return {
    // State
    theme,
    isDark,
    colorScheme,
    
    // Actions (future)
    toggleTheme,
    
    // Helpers
    getColorByPath,
  };
}; 