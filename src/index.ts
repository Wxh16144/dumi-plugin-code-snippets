import type { IApi } from 'dumi';
import { rehypePlugin, remarkPlugin } from './core';


export default (api: IApi) => {
  api.register({
    key: 'modifyConfig',
    stage: Infinity,
    fn: (memo: IApi['config']) => {
      const cloneExtraRemarkPlugins = memo.extraRemarkPlugins,
        cloneExtraRehypePlugins = memo.extraRehypePlugins;

      memo.extraRemarkPlugins = [
        remarkPlugin,
        ...(Array.isArray(cloneExtraRemarkPlugins)
          ? cloneExtraRemarkPlugins
          : ([cloneExtraRemarkPlugins].filter(Boolean) as any)),
      ];

      memo.extraRehypePlugins = [
        rehypePlugin,
        ...(Array.isArray(cloneExtraRehypePlugins)
          ? cloneExtraRehypePlugins
          : ([cloneExtraRehypePlugins].filter(Boolean) as any)),
      ];

      return memo;
    },
  });
};
