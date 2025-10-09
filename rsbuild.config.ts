import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  html: {
    title: 'RuomiChen Wall',
    favicon: './public/logo.svg',
    appIcon: {
      name: 'RuomiChen Wall',
      icons: [
        { src: './public/logo.svg' },
      ],
    },
  },
  plugins: [pluginVue()],
});
