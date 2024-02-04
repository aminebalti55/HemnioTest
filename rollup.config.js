import url from '@rollup/plugin-url';

export default {
  // ...
  plugins: [
    url({
      limit: 0, // All files will be handled by this plugin
      include: ['**/*.svg'], // Use for SVG files
      emitFiles: true // Copy original files to the output directory
    }),
    // ...
  ],
  // ...
};
