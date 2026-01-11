export function optimizeImageUrl(
  url: string,
  width?: number,
  height?: number,
  format: 'webp' | 'jpg' | 'png' = 'webp',
): string {
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('f', format);
  params.set('q', '80');

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}

