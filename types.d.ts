/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Declare CSS modules
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// Declare SCSS/Sass modules (if needed in the future)
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}

// Other common asset types
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}
