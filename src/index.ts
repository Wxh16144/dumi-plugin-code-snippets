import type { IApi } from 'dumi';
import type { RemarkPluginProps } from './core';
import { remarkPlugin } from './core';

export default (api: IApi) => {
  api.describe({
    key: 'dumi-third-party:code-snippets',
    enableBy: api.EnableBy.register,
  });

  api.register({
    key: 'modifyConfig',
    stage: Infinity,
    fn: (memo: IApi['config']) => {
      const cloneExtraRemarkPlugins = memo.extraRemarkPlugins;

      memo.extraRemarkPlugins = [
        [
          remarkPlugin,
          {
            codeBlockMode: memo.resolve?.codeBlockMode,
            cwd: api.cwd,
            alias: memo.alias,
          } as Required<RemarkPluginProps>,
        ],
        ...(Array.isArray(cloneExtraRemarkPlugins)
          ? cloneExtraRemarkPlugins
          : ([cloneExtraRemarkPlugins].filter(Boolean) as any)),
      ];

      return memo;
    },
  });
};
