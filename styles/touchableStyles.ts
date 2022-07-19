import * as styles from './touchableStyles.css'

interface TouchableStylesOptions {
  hoverScale?: keyof typeof styles.hoverScale
  activeScale?: keyof typeof styles.activeScale,
  hoverBackground?: keyof typeof styles.hoverBackground,
  hoverColor?: keyof typeof styles.hoverColor,
  hoverShadow?: keyof typeof styles.hoverShadow,
  hoverBorderColor?: keyof typeof styles.hoverBorderColor,
  focusBorderColor?: keyof typeof styles.focusBorderColor,
}

export function touchableStyles({ 
  hoverScale, 
  activeScale, 
  hoverBackground, 
  hoverColor,
  hoverShadow, 
  hoverBorderColor ,
  focusBorderColor,
}: TouchableStylesOptions) {
  return [
    styles.base, 
    hoverScale && styles.hoverScale[hoverScale], 
    activeScale && styles.activeScale[activeScale],
    hoverBackground && styles.hoverBackground[hoverBackground],
    hoverColor && styles.hoverColor[hoverColor],
    hoverShadow && styles.hoverShadow[hoverShadow],
    hoverBorderColor && styles.hoverBorderColor[hoverBorderColor],
    focusBorderColor && styles.focusBorderColor[focusBorderColor],
  ]
}