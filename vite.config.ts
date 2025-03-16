import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [viteSingleFile(), tailwindcss()],
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  build: {
    // Disable CSS code-splitting to inline all CSS.
    cssCodeSplit: false,
    lib: {
      // Our entry file.
      entry: 'src/main.tsx',
      // Global name for the library.
      name: 'BejamasPrivacyBanner',
      // Output in IIFE format for immediate browser usage.
      formats: ['iife'],
      // Specify output file name.
      fileName: () => 'bejamas-privacy-banner.js',
    },
  },
});
