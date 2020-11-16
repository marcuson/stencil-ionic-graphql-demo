const availableColors = ['ffffff', '41f2a6', 'd3f054', 'f2bd4b', '86eef0'];

export function nextColor(currentColor: string): string {
  if (!currentColor) {
    return availableColors[0];
  }

  const idx = availableColors.findIndex(x => x === currentColor);
  if (idx < 0) {
    return availableColors[0];
  }

  return availableColors[(idx + 1) % availableColors.length];
}
