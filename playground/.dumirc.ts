import { defineConfig } from 'dumi';
import { resolve } from 'path';
import { homepage } from '../package.json';

const isProd = process.env.NODE_ENV === 'production';
// 不是预览模式 同时是生产环境
const isProdSite = process.env.PREVIEW !== '1' && isProd;

const githubRepoName = 'dumi-plugin-code-snippets';

// #region enable
export default defineConfig({
  plugins: ['dumi-plugin-code-snippets'],
  // #endregion enable

  themeConfig: {
    name: 'code-snippets',
    socialLinks: {
      github: homepage,
    },
  },
  outputPath: resolve(__dirname, '../.doc'),
  base: isProdSite ? `/${githubRepoName}/` : '/',
  publicPath: isProdSite ? `/${githubRepoName}/` : '/',
});
