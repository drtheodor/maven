// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    base: '/maven',
    redirects: {
        '/': {
            status: 302,
            destination: '/browse/',
        },
    },
});
