// Color Palette
const palette = {
  // Brand Colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  secondary: '#FF9500',
  secondaryDark: '#CC7700',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Food Colors
  orange: '#F97316',
  green: '#22C55E',
  red: '#EF4444',
  purple: '#8B5CF6',
  blue: '#06B6D4',
};

// Theme Definitions
export const lightTheme = {
  // Background Colors
  background: {
    primary: palette.white,
    secondary: palette.gray50,
    tertiary: palette.gray100,
    card: palette.white,
    modal: palette.white,
  },
  
  // Text Colors
  text: {
    primary: palette.gray900,
    secondary: palette.gray600,
    tertiary: palette.gray500,
    inverse: palette.white,
    link: palette.primary,
  },
  
  // Border Colors
  border: {
    primary: palette.gray200,
    secondary: palette.gray300,
    focus: palette.primary,
  },
  
  // Interactive Colors
  interactive: {
    primary: palette.primary,
    primaryPressed: palette.primaryDark,
    secondary: palette.gray100,
    secondaryPressed: palette.gray200,
    disabled: palette.gray300,
  },
  
  // Tab Bar
  tabBar: {
    background: palette.white,
    iconDefault: palette.gray400,
    iconSelected: palette.primary,
    labelDefault: palette.gray600,
    labelSelected: palette.primary,
  },
  
  // Status Colors
  status: {
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,
  },
  
  // Product Tag Colors
  productTag: {
    vegetarian: { background: '#E8F5E8', text: palette.green },
    vegan: { background: '#E8F5E8', text: palette.green },
    'gluten-free': { background: '#F3E5F5', text: palette.purple },
    spicy: { background: '#FFE5D9', text: palette.orange },
    popular: { background: '#FFF3E0', text: palette.orange },
    healthy: { background: '#E0F7FA', text: palette.blue },
    new: { background: '#F3E5F5', text: palette.purple },
  },
  
  // Shadow
  shadow: {
    color: palette.black,
    opacity: 0.1,
  },
};

export const darkTheme = {
  // Background Colors
  background: {
    primary: palette.gray900,
    secondary: palette.gray800,
    tertiary: palette.gray700,
    card: palette.gray800,
    modal: palette.gray800,
  },
  
  // Text Colors
  text: {
    primary: palette.white,
    secondary: palette.gray300,
    tertiary: palette.gray400,
    inverse: palette.gray900,
    link: '#5AC8FA', // iOS blue for dark mode
  },
  
  // Border Colors
  border: {
    primary: palette.gray700,
    secondary: palette.gray600,
    focus: '#5AC8FA',
  },
  
  // Interactive Colors
  interactive: {
    primary: '#5AC8FA',
    primaryPressed: '#007AFF',
    secondary: palette.gray700,
    secondaryPressed: palette.gray600,
    disabled: palette.gray600,
  },
  
  // Tab Bar
  tabBar: {
    background: palette.gray900,
    iconDefault: palette.gray500,
    iconSelected: '#5AC8FA',
    labelDefault: palette.gray400,
    labelSelected: '#5AC8FA',
  },
  
  // Status Colors
  status: {
    success: '#30D158', // iOS green for dark mode
    warning: '#FF9F0A', // iOS orange for dark mode
    error: '#FF453A',   // iOS red for dark mode
    info: '#64D2FF',    // iOS blue for dark mode
  },
  
  // Product Tag Colors
  productTag: {
    vegetarian: { background: '#1F2F1F', text: '#30D158' },
    vegan: { background: '#1F2F1F', text: '#30D158' },
    'gluten-free': { background: '#251F2F', text: '#BF5AF2' },
    spicy: { background: '#2F1F1F', text: '#FF9F0A' },
    popular: { background: '#2F251F', text: '#FF9F0A' },
    healthy: { background: '#1F252F', text: '#64D2FF' },
    new: { background: '#251F2F', text: '#BF5AF2' },
  },
  
  // Shadow
  shadow: {
    color: palette.black,
    opacity: 0.3,
  },
};

// Export types for TypeScript
export type Theme = typeof lightTheme;
export type ThemeColors = keyof Theme;

// Legacy export for backward compatibility
export default {
  light: {
    text: lightTheme.text.primary,
    background: lightTheme.background.primary,
    tint: lightTheme.interactive.primary,
    tabIconDefault: lightTheme.tabBar.iconDefault,
    tabIconSelected: lightTheme.tabBar.iconSelected,
  },
  dark: {
    text: darkTheme.text.primary,
    background: darkTheme.background.primary,
    tint: darkTheme.interactive.primary,
    tabIconDefault: darkTheme.tabBar.iconDefault,
    tabIconSelected: darkTheme.tabBar.iconSelected,
  },
};
