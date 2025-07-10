import ViteRestart from 'vite-plugin-restart';

export default ({ command }) => ({
    build: {
        outDir: './dist/',
        emptyOutDir: true,
        sourcemap: true,
        manifest: 'manifest.json',
        minify: 'esbuild',
        rollupOptions: {
            input: {
                index: './src/main.js',
            },
            output: {
                // Customize the output directory structure
                assetFileNames: (assetInfo) => {
                  if (assetInfo.name.endsWith('.css')) {
                    return 'css/styles[extname]';
                  }
                  if (assetInfo.name.endsWith('.js')) {
                    return 'js/scripts[extname]';
                  }
                  return '[name][extname]';
                },
                chunkFileNames: 'js/[name].js',
                entryFileNames: 'js/[name].js',
              },
        },
    },
    server: {
        fs: {
          strict: false
        },
        watch: {
          usePolling: true
        },
        host: '0.0.0.0',
        origin: 'http://localhost:3000',
        port: 3000,
        strictPort: true
    },
    plugins: [
        ViteRestart({
            reload: [
                'index.html'
            ]
        }),
    ]
});