import { useColors } from './useColors'

/**
 * Custom hook for food-specific colors
 * Provides easy access to food category colors and helpers
 */
export function useFoodColors() {
  const colors = useColors()
  
  return {
    // Food category colors
    appetizing: colors.food.appetizing,
    fresh: colors.food.fresh,
    warm: colors.food.warm,
    spice: colors.food.spice,
    
    // Product tag helpers
    getTagStyle: (tag: string) => {
      const tagColors = colors.productTag[tag as keyof typeof colors.productTag]
      return tagColors || {
        background: colors.background.tertiary,
        text: colors.text.secondary,
        border: colors.border.primary
      }
    },
    
    // Helper for getting food background colors
    getFoodBackground: (category?: string) => {
      switch (category) {
        case 'spicy':
          return colors.status.errorLight
        case 'healthy':
        case 'vegetarian':
        case 'vegan':
          return colors.status.successLight
        case 'popular':
        case 'new':
          return colors.status.warningLight
        default:
          return colors.background.secondary
      }
    },
    
    // Primary colors for easy access
    primary: colors.interactive.primary,
    secondary: colors.interactive.secondary,
    accent: colors.interactive.accent,
  }
} 