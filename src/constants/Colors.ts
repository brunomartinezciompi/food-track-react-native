// Food Track - Modern Food App Color Palette
const palette = {
  // Brand Colors - Food inspired, appetite stimulating
  primary: '#FF6B35',        // Vibrant coral-orange (main brand)
  primaryDark: '#E55A2B',    // Darker coral for pressed states
  primaryLight: '#FF8F66',   // Lighter coral for subtle elements
  
  secondary: '#27AE60',      // Fresh green (healthy, natural)
  secondaryDark: '#219A52',  // Darker green for pressed states
  secondaryLight: '#58C778', // Lighter green for subtle elements
  
  accent: '#F39C12',         // Warm amber (for highlights, popular items)
  accentDark: '#E67E22',     // Darker amber
  accentLight: '#F7DC6F',    // Light amber for backgrounds
  
  // Neutral Colors - Warm grays for food photography
  white: '#FFFFFF',
  black: '#2C2C2C',          // Softer black for better readability
  cream: '#FEFCF8',          // Warm white for cards
  
  gray50: '#FAFAF9',         // Warm very light gray
  gray100: '#F5F5F4',        // Warm light gray
  gray200: '#E7E5E4',        // Warm light-medium gray
  gray300: '#D6D3D1',        // Warm medium-light gray
  gray400: '#A8A29E',        // Warm medium gray
  gray500: '#78716C',        // Warm dark-medium gray
  gray600: '#57534E',        // Warm dark gray
  gray700: '#44403C',        // Warm very dark gray
  gray800: '#292524',        // Warm almost black
  gray900: '#1C1917',        // Warm black
  
  // Status Colors - Food app optimized
  success: '#27AE60',        // Fresh green
  warning: '#F39C12',        // Warm amber
  error: '#E74C3C',          // Appetizing red (not too harsh)
  info: '#3498DB',           // Friendly blue
  
  // Food Category Colors
  spicy: '#E74C3C',          // Red for spicy
  healthy: '#27AE60',        // Green for healthy
  popular: '#F39C12',        // Amber for popular
  new: '#9B59B6',            // Purple for new items
  vegetarian: '#27AE60',     // Green for vegetarian
  vegan: '#2ECC71',          // Brighter green for vegan
  gluten_free: '#3498DB',    // Blue for gluten-free
  organic: '#F39C12',        // Amber for organic
};

// Theme Definitions
export const lightTheme = {
  // Background Colors
  background: {
    primary: '#FFF5F0',             // Very soft coral-orange background
    secondary: '#FFE8DD',           // Soft orange cream background
    tertiary: '#FFDDD0',            // Subtle orange background
    card: '#FFFFFF',                // Pure white cards for contrast
    modal: '#FFFFFF',               // Pure white modal
    overlay: 'rgba(44, 44, 44, 0.4)', // Warm overlay
    image: '#FFF0E8',               // Soft orange background for images
  },
  
  // Text Colors
  text: {
    primary: palette.gray800,       // Softer than pure black
    secondary: palette.gray600,     // Medium gray for secondary text
    tertiary: palette.gray500,      // Light gray for subtle text
    inverse: palette.white,         // White text on dark backgrounds
    link: palette.primary,          // Brand color for links
    accent: palette.accent,         // Accent color for highlights
  },
  
  // Border Colors
  border: {
    primary: '#FFCBB8',             // Soft orange border
    secondary: '#FFB599',           // Medium orange border
    focus: palette.primary,         // Brand color for focus states
    subtle: '#FFE8DD',              // Very subtle orange border
  },
  
  // Interactive Colors
  interactive: {
    primary: palette.primary,
    primaryPressed: palette.primaryDark,
    primaryLight: palette.primaryLight,
    
    secondary: palette.secondary,
    secondaryPressed: palette.secondaryDark,
    secondaryLight: palette.secondaryLight,
    
    accent: palette.accent,
    accentPressed: palette.accentDark,
    
    surface: '#FFE8DD',              // Soft orange surface
    surfacePressed: '#FFCBB8',       // Orange pressed surface
    disabled: '#FFB599',             // Orange disabled
  },
  
  // Tab Bar
  tabBar: {
    background: '#FFFFFF',           // Pure white for contrast
    border: '#FFCBB8',               // Soft orange border
    iconDefault: palette.gray500,
    iconSelected: palette.primary,
    labelDefault: palette.gray600,
    labelSelected: palette.primary,
  },
  
  // Status Colors
  status: {
    success: palette.success,
    successLight: '#D5EDDA',
    warning: palette.warning,
    warningLight: '#FCF3CF',
    error: palette.error,
    errorLight: '#FADBD8',
    info: palette.info,
    infoLight: '#D6EAF8',
  },
  
  // Product Tag Colors - Enhanced for food
  productTag: {
    spicy: { 
      background: '#FFE5E5', 
      text: '#DC2626',
      border: '#FCA5A5'
    },
    healthy: { 
      background: '#D1FAE5', 
      text: '#059669',
      border: '#6EE7B7'
    },
    popular: { 
      background: '#FEF3C7', 
      text: '#D97706',
      border: '#FCD34D'
    },
    new: { 
      background: '#E9D5FF', 
      text: '#7C3AED',
      border: '#C4B5FD'
    },
    vegetarian: { 
      background: '#D1FAE5', 
      text: '#059669',
      border: '#6EE7B7'
    },
    vegan: { 
      background: '#DCFCE7', 
      text: '#16A34A',
      border: '#86EFAC'
    },
    'gluten-free': { 
      background: '#DBEAFE', 
      text: '#2563EB',
      border: '#93C5FD'
    },
    organic: { 
      background: '#FEF3C7', 
      text: '#D97706',
      border: '#FCD34D'
    },
  },
  
  // Food specific colors
  food: {
    appetizing: palette.primary,      // Main food color
    fresh: palette.secondary,         // Fresh ingredients
    warm: palette.accent,             // Warm dishes
    spice: palette.spicy,            // Spicy indicator
  },
  
  // Shadow
  shadow: {
    color: palette.black,
    opacity: 0.08,                   // Subtle shadows
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
    overlay: 'rgba(0, 0, 0, 0.6)',
    image: palette.gray700,         // Keep darker for dark mode
  },
  
  // Text Colors
  text: {
    primary: palette.white,
    secondary: palette.gray300,
    tertiary: palette.gray400,
    inverse: palette.gray900,
    link: '#FF8F66',                // Lighter orange for dark mode
    accent: '#F7DC6F',              // Lighter amber for dark mode
  },
  
  // Border Colors
  border: {
    primary: palette.gray700,
    secondary: palette.gray600,
    focus: '#FF8F66',               // Lighter orange for dark mode
    subtle: palette.gray800,
  },
  
  // Interactive Colors
  interactive: {
    primary: '#FF8F66',             // Lighter orange for dark mode
    primaryPressed: palette.primary,
    primaryLight: '#FFB399',
    
    secondary: '#58C778',           // Lighter green for dark mode
    secondaryPressed: palette.secondary,
    secondaryLight: '#7DD87F',
    
    accent: '#F7DC6F',              // Lighter amber for dark mode
    accentPressed: palette.accent,
    
    surface: palette.gray700,
    surfacePressed: palette.gray600,
    disabled: palette.gray600,
  },
  
  // Tab Bar
  tabBar: {
    background: palette.gray900,
    border: palette.gray700,
    iconDefault: palette.gray500,
    iconSelected: '#FF8F66',
    labelDefault: palette.gray400,
    labelSelected: '#FF8F66',
  },
  
  // Status Colors
  status: {
    success: '#58C778',
    successLight: '#1F4E2C',
    warning: '#F7DC6F',
    warningLight: '#4A3C0F',
    error: '#FF6B6B',
    errorLight: '#4A1C1C',
    info: '#66B3FF',
    infoLight: '#1F3A4A',
  },
  
  // Product Tag Colors - Dark mode optimized
  productTag: {
    spicy: { 
      background: '#4A1C1C', 
      text: '#FF6B6B',
      border: '#6B2C2C'
    },
    healthy: { 
      background: '#1F4E2C', 
      text: '#58C778',
      border: '#2F5E3C'
    },
    popular: { 
      background: '#4A3C0F', 
      text: '#F7DC6F',
      border: '#5A4C1F'
    },
    new: { 
      background: '#3C2A4A', 
      text: '#C999DD',
      border: '#4C3A5A'
    },
    vegetarian: { 
      background: '#1F4E2C', 
      text: '#58C778',
      border: '#2F5E3C'
    },
    vegan: { 
      background: '#1F4E2C', 
      text: '#7DD87F',
      border: '#2F5E3C'
    },
    'gluten-free': { 
      background: '#1F3A4A', 
      text: '#66B3FF',
      border: '#2F4A5A'
    },
    organic: { 
      background: '#4A3C0F', 
      text: '#F7DC6F',
      border: '#5A4C1F'
    },
  },
  
  // Food specific colors - Dark mode
  food: {
    appetizing: '#FF8F66',
    fresh: '#58C778',
    warm: '#F7DC6F',
    spice: '#FF6B6B',
  },
  
  // Shadow
  shadow: {
    color: palette.black,
    opacity: 0.25,
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
