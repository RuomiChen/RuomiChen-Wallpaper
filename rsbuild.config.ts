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
    output: {
    // 请将 <REPO_NAME> 替换为仓库的名称。
    // 比如 "/my-project/"
    assetPrefix: '/RuomiChen-Wallpaper/',
  },
  plugins: [pluginVue()],
});
