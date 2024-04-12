import { defineConfig } from 'dumi';
import { resolve } from 'path';
import { homepage, name } from '../package.json';

const isProd = process.env.NODE_ENV === 'production';
// 不是预览模式 同时是生产环境
const isProdSite = process.env.PREVIEW !== '1' && isProd;

export default defineConfig({
  plugins: [name],

  themeConfig: {
    name: 'code-snippets',
    socialLinks: {
      github: homepage,
    },
  },
  outputPath: resolve(__dirname, '../.doc'),
  base: isProdSite ? `/${name}/` : '/',
  publicPath: isProdSite ? `/${name}/` : '/',
});
