import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@redux': path.resolve(__dirname, './src/redux'),
        },
    },
    server: {
        port: 5173,
        host: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
    build: {
        sourcemap: false,
        cssCodeSplit: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Group Three.js and its ecosystem together to avoid initialization errors
                        if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
                        if (id.includes('framer-motion')) return 'vendor-motion';
                        if (id.includes('lucide-react')) return 'vendor-icons';
                        if (id.includes('react-toastify')) return 'vendor-toast';
                        if (id.includes('aos')) return 'vendor-aos';
                        return 'vendor';
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1500,
    },
});
