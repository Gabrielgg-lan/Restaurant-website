/// <reference types="vite/client" />

// Global module declarations for assets
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}