// src/types.d.ts

// Declare module for image files (PNG, JPG, JPEG, GIF, SVG)
// This tells TypeScript that when you import a file with these extensions,
// the import will resolve to a string (which will be the URL to the image asset)
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  // For SVG files, you might sometimes want to import them as React components
  // (e.g., using @svgr/webpack or Vite's SVG plugin).
  // If so, you'd add:
  // import React = require('react');
  // export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  // If you only want the URL (like for <img> tags), keep it simple:
  const value: string;
  export default value;
}

// Optionally, you can add declarations for other asset types if you import them
// For example, for video files:
declare module '*.mp4' {
  const value: string;
  export default value;
}

// For font files:
declare module '*.woff' {
  const value: string;
  export default value;
}

declare module '*.woff2' {
  const value: string;
  export default value;
}

declare module '*.eot' {
  const value: string;
  export default value;
}

declare module '*.ttf' {
  const value: string;
  export default value;
}
