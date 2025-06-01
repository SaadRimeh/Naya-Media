import { colors, ThemeColors } from './colors';
import { spacing, borderRadius, typography, shadows } from './spacing';

export type Theme = {
  colors: ThemeColors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  shadows: typeof shadows.light;
};

export { colors, spacing, borderRadius, typography, shadows };