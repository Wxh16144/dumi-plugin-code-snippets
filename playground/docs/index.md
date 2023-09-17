---
title: dumi-plugin-code-snippets
---

<br>

## 从现有代码中导入片段

> 该功能完全借鉴的 [VitePress - mport Code Snippets](https://vitepress.dev/guide/markdown#import-code-snippets)，理论上写法完全一致。

<br>

**Snippets** <i>./snippets/install.bash</i>

<<< ./snippets/install.bash

**Input**

```markdown
<<< ./snippets/install.bash{2}
```

**Output**

<<< ./snippets/install.bash{2}

---

### Enable

<<< ../.dumirc.ts#enable
