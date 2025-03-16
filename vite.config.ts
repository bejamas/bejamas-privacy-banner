import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tailwindcss from '@tailwindcss/vite';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    viteSingleFile(),
    tailwindcss(),
    // Inject the createElement function to implicitly use in all JSX files.
    inject({
      createElement: ['./lib/runtime.tsx', 'createElement'],
    }),
  ],
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
