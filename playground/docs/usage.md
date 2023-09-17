---
title: Usage
---

# 安装

```bash
npm install dumi-plugin-code-snippets --save-dev
```

# 使用

```js {3} | pure
// .dumirc.ts
export default {
  plugins: ['dumi-plugin-code-snippets'],
};
```

## 自定义

<i>Source Code: [src/component/index.tsx](https://github.com/Wxh16144/dumi-plugin-code-snippets/blob/master/src/component/index.tsx)</i>

```js | pure
// .duim/theme/builtins/ColorChunk.ts
import { TinyColor } from 'dumi-plugin-code-snippets/component';

export default (props) => {
  return (
    <code>
      {props.children ?? new TinyColor(props.children).toHexString()}
      {/* more logic */}
    </code>
  );
};
```
