import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import inject from '@rollup/plugin-inject';
import svgr from 'vite-plugin-svgr';

// SVG plugin custom template
const customTemplate = (variables, { tpl }) => {
  return tpl`
    import { createElement } from '@/lib/runtime';
    const ${variables.componentName} = (props) => <svg {...props}>${variables.jsx}</svg>;
    ${variables.exports}
  `;
};

export default defineConfig({
  plugins: [
    viteSingleFile(),
    tsconfigPaths(),
    tailwindcss(),
    // Inject the createElement function to implicitly use in all JSX files.
    inject({
      createElement: ['@/lib/runtime.tsx', 'createElement'],
      Fragment: ['@/lib/runtime.tsx', 'Fragment'],
    }),
    svgr({
      svgrOptions: {
        template: customTemplate,
      },
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
