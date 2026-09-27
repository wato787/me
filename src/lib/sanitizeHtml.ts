import sanitizeHtml from 'sanitize-html';

export function sanitizeContentHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'id'],
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading', 'decoding', 'class'],
      iframe: ['src', 'title', 'loading', 'allow', 'allowfullscreen', 'referrerpolicy', 'class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'speakerdeck.com'],
  });
}
