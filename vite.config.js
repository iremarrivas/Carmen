import { defineConfig } from 'vite'

// Serve the `src` directory as the Vite root so your `src/index.html` is used
export default defineConfig({
  root: 'src',
  publicDir: '../public', // the root is `src`, so the public dir is relative to that, looking one level up
  server: {
    open: true
  }
})
