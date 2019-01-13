// Colors (https://material.io/tools/color/#!/?view.left=0&view.right=1&primary.color=6e7af9&primary.text.color=ffffff)

export const brandColor = '#6e7af9';
export const textOnBrandColor = 'white';
export const brandColorLight = '#a4a9ff';
export const textOnBrandColorLight = 'black';
export const brandColorDark = '#314ec5';
export const textOnBrandColorDark = 'white';

export const backgroundColor = '#2a2c3d';
export const textOnBackgroundColor = 'white';
export const textSecondaryColor = 'rgba(255, 255, 255, 0.7)';
export const backgroundColorLight = '#535568';
export const textOnBackgroundColorLight = 'white';

export const iconOnBackgroundColor = 'rgba(255, 255, 255, 0.54)';
export const iconActiveOnBackgroundColor = 'white';

export const dividerColor = 'rgba(255, 255, 255, 0.12)';

export const borderRadius = 24;

export function toRGBA(hex, opacity) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
