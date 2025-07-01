import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Colors';

/**
 * Custom hook to access theme colors
 * Provides easy access to current theme colors with TypeScript support
 */
export function useColors(): Theme {
  const { theme } = useTheme();
  return theme;
}

/**
 * Custom hook to get specific color category
 * Usage: const backgrounds = useColorCategory('background');
 */
export function useColorCategory<T extends keyof Theme>(category: T): Theme[T] {
  const { theme } = useTheme();
  return theme[category];
} 